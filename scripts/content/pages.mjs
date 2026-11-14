// Static pages built at deploy time. Each page is pre-rendered HTML with its own title, description and H1 (listed in sitemap.xml automatically).
// To add a page (About, Services, a brand page…): add an object here — `body` is plain HTML — and rebuild. Copy and keywords come from the SEO team / client.
const UPDATED = '13 November 2026';

export const PAGES = [
  {
    slug: 'privacy',
    title: 'Privacy Policy | Estuscia Group',
    description: 'How Estuscia Group collects, uses and protects the information you share through www.estusciagroup.com, including the contact form and analytics.',
    eyebrow: 'Legal',
    h1: 'Privacy Policy',
    lead: `Last updated: ${UPDATED}`,
    body: ({ SITE }) => `
<h2>1. Who we are</h2>
<p>This website, www.estusciagroup.com, is operated by Estuscia Group (“Estuscia”, “we”, “us”). You can reach us at <a href="mailto:${SITE.email}">${SITE.email}</a> or ${SITE.phones[0].label}.</p>
<h2>2. Information we collect</h2>
<ul>
<li><b>Contact form.</b> If you send us an enquiry we collect your full name, email address, phone number, organisation (optional) and the message you write.</li>
<li><b>Usage data.</b> We use Google Analytics 4 to understand how the site is used. It records things like pages viewed, device and browser type and approximate location, and may set cookies or similar identifiers.</li>
</ul>
<h2>3. How we use it</h2>
<ul>
<li>To read and reply to your enquiry.</li>
<li>To keep the website secure and working, and to improve its content and performance.</li>
</ul>
<h2>4. Who receives it</h2>
<ul>
<li>Our email-delivery provider (EmailJS), which passes your enquiry to our support mailbox.</li>
<li>Google, for analytics.</li>
<li>Our hosting and network providers, which process technical data needed to serve the site.</li>
</ul>
<p>We do not sell your personal information.</p>
<h2>5. Copy kept in your browser</h2>
<p>After you submit the form, your browser may keep a copy of the submission in its own local storage on your device. We do not receive or have access to that copy, and you can clear it through your browser settings.</p>
<h2>6. How long we keep it</h2>
<p>We keep enquiry details for as long as needed to respond and to maintain our business records, and then delete or anonymise them.</p>
<h2>7. Your choices</h2>
<p>You can ask us to access, correct or delete the personal information you sent us by writing to <a href="mailto:${SITE.email}">${SITE.email}</a>. You can limit analytics through your browser settings or the Google Analytics opt-out add-on.</p>
<h2>8. Security</h2>
<p>We take reasonable steps to protect information, but no website or transmission method can be guaranteed to be completely secure.</p>
<h2>9. Children</h2>
<p>This website is intended for business visitors and is not directed at children.</p>
<h2>10. Changes to this policy</h2>
<p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
<h2>11. Contact</h2>
<p>Questions about this policy: <a href="mailto:${SITE.email}">${SITE.email}</a> · ${SITE.office.address}.</p>`,
  },
  {
    slug: 'terms',
    title: 'Terms of Use | Estuscia Group',
    description: 'The terms that apply when you use www.estusciagroup.com, the website of Estuscia Group.',
    eyebrow: 'Legal',
    h1: 'Terms of Use',
    lead: `Last updated: ${UPDATED}`,
    body: ({ SITE }) => `
<h2>1. Acceptance</h2>
<p>By using www.estusciagroup.com you agree to these terms. If you do not agree, please do not use the website.</p>
<h2>2. Information only</h2>
<p>The content on this website is general information about Estuscia Group and its businesses. It is not investment, financial, legal or tax advice, and nothing on it is an offer or a solicitation to buy or sell any security or financial product. Visuals on the site are illustrative and do not show investment performance.</p>
<h2>3. No guarantee</h2>
<p>We make reasonable efforts to keep the content accurate and up to date, but we give no warranty that it is complete or error-free.</p>
<h2>4. Enquiries</h2>
<p>Sending an enquiry through the contact form does not create a client, advisory or any other professional relationship. Please do not send confidential or sensitive information in the form.</p>
<h2>5. Intellectual property</h2>
<p>The text, logos, images and design of this website belong to Estuscia Group or its licensors. You may not copy, reproduce or reuse them without our written permission.</p>
<h2>6. Acceptable use</h2>
<p>You agree not to misuse the website, attempt to disrupt or gain unauthorised access to it, or use it for unlawful purposes.</p>
<h2>7. Third-party links</h2>
<p>Links to other websites are provided for convenience. We do not control and are not responsible for their content.</p>
<h2>8. Changes and availability</h2>
<p>We may change the website or these terms at any time and do not promise uninterrupted availability.</p>
<h2>9. Limitation of liability</h2>
<p>To the extent permitted by law, Estuscia Group is not liable for any loss arising from your use of, or reliance on, this website.</p>
<h2>10. Governing law</h2>
<p>These terms are governed by the laws of India.</p>
<h2>11. Contact</h2>
<p>Questions about these terms: <a href="mailto:${SITE.email}">${SITE.email}</a> · ${SITE.office.address}.</p>`,
  },
];

/** Branded 404 (served by the host with status 404). Not listed in the sitemap and set to noindex. */
export const NOT_FOUND = {
  title: 'Page not found | Estuscia Group',
  description: 'The page you were looking for could not be found.',
  eyebrow: '404',
  h1: 'Page not found',
  lead: 'The page you are looking for may have moved or no longer exists.',
  body: () => '<p><a class="btn p" href="/">Back to the home page</a></p>',
};
