import { baseStyles, wrapEmailHtml, emailFooter, currentYear } from './base-styles';

// Email to practitioner when they receive a consultation request
export interface ConsultationRequestEmailData {
  practitionerName: string;
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  notes?: string;
  condition?: string;
  dashboardUrl: string;
}

export function consultationRequestEmail(data: ConsultationRequestEmailData): { subject: string; html: string; text: string } {
  const {
    practitionerName,
    patientName,
    patientEmail,
    patientPhone,
    notes,
    condition,
    dashboardUrl,
  } = data;

  const firstName = practitionerName.split(' ')[0] || practitionerName;
  const subject = `New Consultation Request from ${patientName}`;

  const content = `
    <div class="container">
      <div class="header">
        <h1>New Consultation Request</h1>
        <p>A patient is interested in your services</p>
      </div>
      <div class="content">
        <p>Hi ${firstName},</p>
        <p>Great news! You've received a new consultation request through the Ketamine Association.</p>

        <div class="card">
          <div style="margin-bottom: 16px;">
            <div class="label">Patient Name</div>
            <div class="value">${patientName}</div>
          </div>
          <div style="margin-bottom: 16px;">
            <div class="label">Email</div>
            <div class="value">
              <a href="mailto:${patientEmail}" style="color: #0F7A7A;">${patientEmail}</a>
            </div>
          </div>
          ${patientPhone ? `
          <div style="margin-bottom: 16px;">
            <div class="label">Phone</div>
            <div class="value">
              <a href="tel:${patientPhone}" style="color: #0F7A7A;">${patientPhone}</a>
            </div>
          </div>
          ` : ''}
          ${condition ? `
          <div style="margin-bottom: 16px;">
            <div class="label">Condition</div>
            <div class="value">${condition}</div>
          </div>
          ` : ''}
          ${notes ? `
          <div>
            <div class="label">Message</div>
            <div class="value" style="white-space: pre-wrap;">${notes}</div>
          </div>
          ` : ''}
        </div>

        <div class="highlight">
          <strong>Quick Response Tip:</strong>
          <p style="margin: 8px 0 0 0;">
            Studies show that responding within 24 hours increases patient conversion by 80%.
            The sooner you reach out, the more likely the patient is to book with you.
          </p>
        </div>

        <p style="text-align: center; margin-top: 30px;">
          <a href="${dashboardUrl}" class="btn">View in Dashboard</a>
        </p>

        <div class="divider"></div>

        <p style="font-size: 14px; color: #64748B;">
          You're receiving this because you're a verified provider on the Ketamine Association.
          Manage your notification preferences in your <a href="${dashboardUrl}/settings" style="color: #0F7A7A;">dashboard settings</a>.
        </p>
      </div>
      ${emailFooter()}
    </div>
  `;

  const text = `
New Consultation Request from ${patientName}

Hi ${firstName},

You've received a new consultation request through the Ketamine Association.

Patient Details:
- Name: ${patientName}
- Email: ${patientEmail}
${patientPhone ? `- Phone: ${patientPhone}` : ''}
${condition ? `- Condition: ${condition}` : ''}
${notes ? `- Message: ${notes}` : ''}

Tip: Responding within 24 hours increases conversion by 80%.

View in dashboard: ${dashboardUrl}

(c) ${currentYear} KetamineAssociation.org
  `.trim();

  return {
    subject,
    html: wrapEmailHtml(content, baseStyles),
    text,
  };
}

// Email to patient confirming their consultation request was sent
export interface ConsultationConfirmationEmailData {
  patientName: string;
  practitionerName: string;
  practitionerCredentials?: string;
  practitionerCity: string;
  practitionerState: string;
  consultationId: string;
}

export function consultationConfirmationEmail(data: ConsultationConfirmationEmailData): { subject: string; html: string; text: string } {
  const {
    patientName,
    practitionerName,
    practitionerCredentials,
    practitionerCity,
    practitionerState,
    consultationId,
  } = data;

  const firstName = patientName.split(' ')[0] || patientName;
  const fullPractitionerName = practitionerCredentials
    ? `${practitionerName}, ${practitionerCredentials}`
    : practitionerName;
  const subject = 'Your Consultation Request Has Been Sent';

  const content = `
    <div class="container">
      <div class="header">
        <h1>Request Sent!</h1>
        <p>Your consultation request is on its way</p>
      </div>
      <div class="content">
        <p>Hi ${firstName},</p>
        <p>Your consultation request has been successfully submitted to:</p>

        <div class="card">
          <div style="margin-bottom: 16px;">
            <div class="label">Provider</div>
            <div class="value">${fullPractitionerName}</div>
          </div>
          <div style="margin-bottom: 16px;">
            <div class="label">Location</div>
            <div class="value">${practitionerCity}, ${practitionerState}</div>
          </div>
          <div>
            <div class="label">Request ID</div>
            <div class="value" style="font-family: monospace;">${consultationId.slice(0, 8).toUpperCase()}</div>
          </div>
        </div>

        <div class="highlight">
          <strong>What Happens Next?</strong>
          <p style="margin: 8px 0 0 0;">
            The provider will review your request and typically responds within 24-48 hours.
            Keep an eye on your inbox for their response.
          </p>
        </div>

        <p>While you wait, you can:</p>
        <ul>
          <li>Browse our <a href="https://ketamineassociation.org/academy/patients" style="color: #0F7A7A;">patient education resources</a></li>
          <li>Learn about <a href="https://ketamineassociation.org/academy/patients/conditions" style="color: #0F7A7A;">conditions treated with ketamine therapy</a></li>
          <li>Explore <a href="https://ketamineassociation.org/providers" style="color: #0F7A7A;">other verified providers</a> in your area</li>
        </ul>

        <p style="text-align: center; margin-top: 30px;">
          <a href="https://ketamineassociation.org/dashboard/patient/consultations" class="btn">Track Your Request</a>
        </p>
      </div>
      ${emailFooter()}
    </div>
  `;

  const text = `
Your Consultation Request Has Been Sent

Hi ${firstName},

Your consultation request has been submitted to:

Provider: ${fullPractitionerName}
Location: ${practitionerCity}, ${practitionerState}
Request ID: ${consultationId.slice(0, 8).toUpperCase()}

What happens next?
The provider will review your request and typically responds within 24-48 hours.

Track your request: https://ketamineassociation.org/dashboard/patient/consultations

(c) ${currentYear} KetamineAssociation.org
  `.trim();

  return {
    subject,
    html: wrapEmailHtml(content, baseStyles),
    text,
  };
}
