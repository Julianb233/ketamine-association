import { baseStyles, wrapEmailHtml, emailFooter, currentYear } from './base-styles';

export interface WelcomeEmailData {
  name: string;
  email: string;
  role: 'PATIENT' | 'PRACTITIONER';
  dashboardUrl?: string;
}

export function welcomeEmail(data: WelcomeEmailData): { subject: string; html: string; text: string } {
  const { name, role, dashboardUrl } = data;
  const isPractitioner = role === 'PRACTITIONER';
  const firstName = name.split(' ')[0] || name;
  const baseUrl = dashboardUrl || 'https://ketamineassociation.org';

  const subject = isPractitioner
    ? 'Welcome to the Ketamine Association - Your Provider Account is Ready'
    : 'Welcome to the Ketamine Association';

  const content = `
    <div class="container">
      <div class="header">
        <h1>Welcome, ${firstName}!</h1>
        <p>We're glad you've joined us</p>
      </div>
      <div class="content">
        <p>Hi ${firstName},</p>

        ${isPractitioner ? `
        <p>Thank you for joining the Ketamine Association as a provider. Your account has been created and you're now part of a growing network of ketamine therapy professionals.</p>

        <div class="highlight">
          <strong>Next Steps to Get Started:</strong>
          <ul style="margin: 10px 0 0 0;">
            <li>Complete your provider profile to appear in our directory</li>
            <li>Add your certifications and credentials</li>
            <li>Set up your availability and services</li>
            <li>Explore our continuing education resources</li>
          </ul>
        </div>

        <p>A complete profile helps patients find you and builds trust. Providers with complete profiles receive <strong>3x more consultation requests</strong>.</p>
        ` : `
        <p>Thank you for creating an account with the Ketamine Association. We're here to help you on your wellness journey with trusted information and verified providers.</p>

        <div class="highlight">
          <strong>What You Can Do:</strong>
          <ul style="margin: 10px 0 0 0;">
            <li>Find verified ketamine therapy providers near you</li>
            <li>Request consultations with qualified practitioners</li>
            <li>Access patient education resources</li>
            <li>Save providers and track your consultations</li>
          </ul>
        </div>

        <p>Your health and safety are our priority. All providers in our directory are verified for credentials and compliance.</p>
        `}

        <p style="text-align: center; margin-top: 30px;">
          <a href="${baseUrl}/dashboard" class="btn">Go to Your Dashboard</a>
        </p>

        <div class="divider"></div>

        <p style="font-size: 14px; color: #64748B;">
          Have questions? Visit our <a href="${baseUrl}/faq" style="color: #0F7A7A;">FAQ</a> or
          <a href="${baseUrl}/contact" style="color: #0F7A7A;">contact us</a>.
        </p>
      </div>
      ${emailFooter()}
    </div>
  `;

  const text = `
Welcome to the Ketamine Association, ${firstName}!

${isPractitioner
  ? `Thank you for joining as a provider. Your account is ready.

Next Steps:
- Complete your provider profile
- Add your certifications and credentials
- Set up your availability and services
- Explore our continuing education resources

Visit your dashboard: ${baseUrl}/dashboard`
  : `Thank you for creating an account. We're here to help you find trusted ketamine therapy providers.

What you can do:
- Find verified providers near you
- Request consultations
- Access patient education resources

Visit your dashboard: ${baseUrl}/dashboard`}

Questions? Contact us at support@ketamineassociation.org

(c) ${currentYear} KetamineAssociation.org
  `.trim();

  return {
    subject,
    html: wrapEmailHtml(content, baseStyles),
    text,
  };
}
