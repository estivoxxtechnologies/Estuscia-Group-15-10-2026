import { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS } from '../../config/emailjs';
import { SITE } from '../../config/site';
import { INQUIRY_OPTIONS } from '../../data/inquiry';
import type { ContactFormData, FormErrors, InquiryType } from '../../types';
import { saveLeadLocally } from '../../utils/leads';
import { validate } from './validation';
import Reveal from '../../components/ui/Reveal';

const EMPTY: ContactFormData = { fullName: '', email: '', phone: '', organization: '', inquiryType: 'General Inquiry', message: '' };
type Status = 'idle' | 'sending' | 'error' | 'done' | 'demo';

export default function ContactForm() {
  const [data, setData] = useState<ContactFormData>(EMPTY), [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle'), [sentName, setSentName] = useState('');
  const busy = useRef(false), honeypot = useRef<HTMLInputElement>(null);
  const set = <K extends keyof ContactFormData>(k: K, v: ContactFormData[K]) => setData(d => ({ ...d, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy.current) return;                       // no duplicate submissions
    const er = validate(data); setErrors(er);
    if (Object.keys(er).length || honeypot.current?.value) return;
    const snapshot = { ...data };                   // captured BEFORE the form is cleared
    busy.current = true; setStatus('sending');
    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        full_name: snapshot.fullName, email: snapshot.email, phone: snapshot.phone,
        organization: snapshot.organization || 'Not Provided', inquiry_type: snapshot.inquiryType, message: snapshot.message, date: new Date().toLocaleString(),
      }, EMAILJS.publicKey);
      saveLeadLocally(snapshot); setSentName(snapshot.fullName); setData(EMPTY); setStatus('done');
    } catch (err) { console.error('EmailJS error:', err); setSentName(snapshot.fullName); setStatus('error'); }   // never a false success
    finally { busy.current = false; }
  };

  const field = (k: keyof ContactFormData) => ({ id: k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const Err = ({ k }: { k: keyof ContactFormData }) => errors[k] ? <em id={`${k}-err`} role="alert">{errors[k]}</em> : null;

  if (status === 'done' || status === 'demo') return (
    <Reveal className="glass" delay={0.1}><div className="done" role="status">
      <span className="eyebrow">{status === 'demo' ? 'Preview of success state' : 'Message sent'}</span><h3>Inquiry Received Successfully</h3>
      <p>Thank you, <b className="v">{sentName}</b>. {status === 'demo' ? 'This is a design preview — nothing was sent.' : 'Your message has been received and we will reach out via email shortly.'}</p>
      <button className="btn" onClick={() => { setStatus('idle'); setErrors({}); }}>Submit Another Request</button>
    </div></Reveal>);

  return (
    <Reveal className="glass" delay={0.1}>
      <form id="cf" onSubmit={submit} noValidate>
        <div><h3 className="fh">Send Us a Message</h3><p className="sm">Fill out the fields below and select your primary vertical of interest.</p></div>
        <div className="two">
          <div className={'f' + (errors.fullName ? ' bad' : '')}><label htmlFor="fullName">Full Name <b>*</b></label><input {...field('fullName')} autoComplete="name" placeholder="e.g. Eleanor Vance" value={data.fullName} onChange={e => set('fullName', e.target.value)} /><Err k="fullName" /></div>
          <div className={'f' + (errors.email ? ' bad' : '')}><label htmlFor="email">Corporate Email <b>*</b></label><input {...field('email')} type="email" autoComplete="email" placeholder="name@company.com" value={data.email} onChange={e => set('email', e.target.value)} /><Err k="email" /></div>
        </div>
        <div className="two">
          <div className={'f' + (errors.phone ? ' bad' : '')}><label htmlFor="phone">Phone Number <b>*</b></label><input {...field('phone')} type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" value={data.phone} onChange={e => set('phone', e.target.value)} /><Err k="phone" /></div>
          <div className="f"><label htmlFor="organization">Organization / Company</label><input id="organization" autoComplete="organization" placeholder="Company or Startup Name" value={data.organization} onChange={e => set('organization', e.target.value)} /></div>
        </div>
        <div className="f"><label htmlFor="inquiryType">Area of Interest / Vertical <b>*</b></label>
          <select id="inquiryType" value={data.inquiryType} onChange={e => set('inquiryType', e.target.value as InquiryType)}>{INQUIRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
        <div className={'f' + (errors.message ? ' bad' : '')}><label htmlFor="message">Message / Project Details <b>*</b></label><textarea {...field('message')} rows={4} placeholder="Briefly describe your objectives, project timeline, or specific requirements..." value={data.message} onChange={e => set('message', e.target.value)} /><Err k="message" /></div>
        <input ref={honeypot} className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
        <button className="btn p send" disabled={status === 'sending'}>{status === 'sending' ? 'Processing Submission...' : 'Submit Inquiry to Estuscia Group'}</button>
        <div className="st bad" role="status" aria-live="polite">
          {status === 'error' && <>We couldn’t send your message, so nothing was submitted. Please try again or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            {import.meta.env.DEV && <> <button type="button" className="linkbtn" onClick={() => setStatus('demo')}>Dev only: preview success screen</button></>}</>}
        </div>
      </form>
    </Reveal>);
}
