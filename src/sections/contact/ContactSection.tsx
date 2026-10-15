import Reveal from '../../components/ui/Reveal';
import Split from '../../components/ui/Split';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section id="contact"><div className="wrap">
      <div className="chead">
        <Reveal as="span" className="pill">✦ Connect With Us</Reveal>
        <Split text="Start the *Conversation*" />
        <Reveal as="p" className="lead mid">Connect with our executive team to explore financial advisory, corporate consulting, technology integration, global trade, or startup incubation.</Reveal>
      </div>
      <div className="cgrid"><ContactInfo /><ContactForm /></div>
    </div></section>
  );
}
