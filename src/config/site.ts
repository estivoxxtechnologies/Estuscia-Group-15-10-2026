const base = import.meta.env.BASE_URL;
export const SITE = {
  name: 'Estuscia Group',
  url: 'https://www.estusciagroup.com/',
  email: 'support@estuscia.com',
  phones: [{ label: '(+91) 9633329669', tel: '+919633329669' }, { label: '9633359669', tel: '+919633359669' }],
  office: { name: 'Estuscia Group', address: 'Hilite Business Park, Calicut' },
  hours: { line: 'Monday - Saturday: 09:30 AM - 05:30 PM IST', note: 'Closed on public holidays' }, // TODO: confirm (source also said "Closed Weekends")
  responseTime: 'Inquiries answered within 24 business hours', // TODO: confirm this commitment
  confidentiality: 'All communications and proposals submitted are protected under strict NDA and corporate confidentiality protocols.', // TODO: confirm policy
};
export const ASSETS = { logo: `${base}images/logo.png`, team: (file: string) => `${base}public/images/team/${file}` };
