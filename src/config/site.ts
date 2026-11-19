const base = import.meta.env.BASE_URL;
export const SITE = {
  name: 'Estuscia Group',
  url: 'https://www.estusciagroup.com/',
  email: 'support@estuscia.com',
  phones: [{ label: '(+91) 9633329669', tel: '+919633329669' }, { label: '9633359669', tel: '+919633359669' }],
  office: { name: 'Estuscia Group', address: 'HiLITE City, HiLITE Business Park, Tower 1, 7th Floor, Kozhikode – 673014' },
  hours: { line: 'Monday - Saturday: 09:30 AM - 05:30 PM IST', note: 'Closed on public holidays' },
  responseTime: 'Inquiries answered within 12 business hours',
};
export const LOGO = { width: 2236, height: 403 };   // intrinsic size of the logo file (prevents layout shift)
export const ASSETS = { logo: `${base}images/logo.webp`, video: `${base}videos/teaser.mp4`, poster: `${base}videos/teaser-poster.jpg`, team: (file: string) => `${base}images/team/${file}` };
