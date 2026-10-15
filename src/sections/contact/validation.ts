import type { ContactFormData, FormErrors } from '../../types';
export function validate(d: ContactFormData): FormErrors {
  const e: FormErrors = {};
  if (!d.fullName.trim()) e.fullName = 'Please enter your full name.';
  if (!d.email.trim()) e.email = 'Please enter your corporate email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Enter a valid email address.';
  if (!d.phone.trim()) e.phone = 'Please enter your phone number.';
  else if (!/^\+?[\d\s()-]{7,18}$/.test(d.phone.trim())) e.phone = 'Enter a valid phone number.';
  if (d.message.trim().length < 10) e.message = 'Please add a few details (at least 10 characters).';
  return e;
}
