import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@ketamineassociation.org";

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, text, replyTo }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      replyTo,
    });

    if (error) {
      console.error("Email send error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

// Email templates
export const emailTemplates = {
  newLead: (data: {
    practitionerName: string;
    patientName: string;
    patientEmail: string;
    patientPhone?: string;
    message?: string;
    condition?: string;
    dashboardUrl: string;
  }) => ({
    subject: `New Patient Inquiry from ${data.patientName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #334155; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0F7A7A 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px; border: 1px solid #E2E8F0; border-top: none; }
          .lead-card { background: #F8FAFC; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .label { font-size: 12px; color: #64748B; text-transform: uppercase; margin-bottom: 4px; }
          .value { font-size: 16px; color: #1E293B; font-weight: 600; }
          .btn { display: inline-block; background: #0F7A7A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748B; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Patient Inquiry!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.practitionerName},</p>
            <p>Great news! You've received a new consultation request through KetamineAssociation.org.</p>

            <div class="lead-card">
              <div style="margin-bottom: 16px;">
                <div class="label">Patient Name</div>
                <div class="value">${data.patientName}</div>
              </div>
              <div style="margin-bottom: 16px;">
                <div class="label">Email</div>
                <div class="value">${data.patientEmail}</div>
              </div>
              ${data.patientPhone ? `
              <div style="margin-bottom: 16px;">
                <div class="label">Phone</div>
                <div class="value">${data.patientPhone}</div>
              </div>
              ` : ''}
              ${data.condition ? `
              <div style="margin-bottom: 16px;">
                <div class="label">Condition</div>
                <div class="value">${data.condition}</div>
              </div>
              ` : ''}
              ${data.message ? `
              <div>
                <div class="label">Message</div>
                <div class="value">${data.message}</div>
              </div>
              ` : ''}
            </div>

            <p><strong>Pro tip:</strong> Responding within 24 hours increases conversion by 80%.</p>

            <p style="text-align: center; margin-top: 30px;">
              <a href="${data.dashboardUrl}" class="btn">View in Dashboard</a>
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} KetamineAssociation.org</p>
            <p>You're receiving this because you're a member of the Ketamine Association.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  leadConfirmation: (data: {
    patientName: string;
    practitionerName: string;
    practitionerCity: string;
    practitionerState: string;
  }) => ({
    subject: "Your consultation request has been sent",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #334155; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0F7A7A 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px; border: 1px solid #E2E8F0; }
          .footer { text-align: center; padding: 20px; color: #64748B; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Request Sent!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.patientName},</p>
            <p>Your consultation request has been sent to <strong>${data.practitionerName}</strong> in ${data.practitionerCity}, ${data.practitionerState}.</p>
            <p>The provider typically responds within 24-48 hours. Keep an eye on your inbox!</p>
            <p>In the meantime, you can explore our patient education resources to learn more about ketamine therapy.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} KetamineAssociation.org</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  welcomePractitioner: (data: { name: string; tier: string }) => ({
    subject: "Welcome to the Ketamine Association!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #334155; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0F7A7A 0%, #10B981 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: white; padding: 30px; border: 1px solid #E2E8F0; }
          .btn { display: inline-block; background: #0F7A7A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748B; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome, ${data.name}!</h1>
          </div>
          <div class="content">
            <p>Congratulations on joining the Ketamine Association as a <strong>${data.tier}</strong> member!</p>
            <p>Here's what you can do next:</p>
            <ul>
              <li>Complete your provider profile</li>
              <li>Add your certifications and credentials</li>
              <li>Set up your availability</li>
              <li>Explore our education resources</li>
            </ul>
            <p style="text-align: center; margin-top: 30px;">
              <a href="https://ketamineassociation.org/dashboard/practitioner" class="btn">Go to Dashboard</a>
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} KetamineAssociation.org</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  newsletterWelcome: (data: { name?: string; role: string }) => ({
    subject: "Welcome to the Ketamine Association Newsletter!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #334155; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0F7A7A 0%, #10B981 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: white; padding: 30px; border: 1px solid #E2E8F0; }
          .highlight { background: #F0FDF4; border-left: 4px solid #10B981; padding: 16px; margin: 20px 0; }
          .btn { display: inline-block; background: #0F7A7A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748B; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Our Newsletter!</h1>
          </div>
          <div class="content">
            <p>Hi${data.name ? ` ${data.name}` : ""},</p>
            <p>Thank you for subscribing to the Ketamine Association newsletter! You're now part of a community dedicated to advancing ketamine therapy.</p>

            <div class="highlight">
              <strong>What to Expect:</strong>
              <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>Latest research and clinical insights</li>
                <li>Industry news and regulatory updates</li>
                <li>Educational resources and event announcements</li>
                <li>Expert interviews and best practices</li>
              </ul>
            </div>

            <p>We respect your inbox and will only send you valuable, relevant content.</p>

            <p style="text-align: center; margin-top: 30px;">
              <a href="https://ketamineassociation.org" class="btn">Explore Our Resources</a>
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} KetamineAssociation.org</p>
            <p style="font-size: 12px; color: #94A3B8;">
              You received this email because you subscribed to our newsletter.<br>
              <a href="https://ketamineassociation.org/unsubscribe" style="color: #64748B;">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  eventRegistrationConfirmation: (data: {
    name: string;
    eventTitle: string;
    eventDate: string;
    eventLocation?: string;
    virtualUrl?: string;
    isVirtual: boolean;
  }) => ({
    subject: `Registration Confirmed: ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #334155; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0F7A7A 0%, #10B981 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px; border: 1px solid #E2E8F0; }
          .event-card { background: #F8FAFC; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .label { font-size: 12px; color: #64748B; text-transform: uppercase; margin-bottom: 4px; }
          .value { font-size: 16px; color: #1E293B; font-weight: 600; }
          .btn { display: inline-block; background: #0F7A7A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748B; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>You're Registered!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>Your registration for the following event has been confirmed:</p>

            <div class="event-card">
              <div style="margin-bottom: 16px;">
                <div class="label">Event</div>
                <div class="value">${data.eventTitle}</div>
              </div>
              <div style="margin-bottom: 16px;">
                <div class="label">Date & Time</div>
                <div class="value">${data.eventDate}</div>
              </div>
              ${data.isVirtual && data.virtualUrl ? `
              <div>
                <div class="label">Join Link</div>
                <div class="value"><a href="${data.virtualUrl}" style="color: #0F7A7A;">${data.virtualUrl}</a></div>
              </div>
              ` : data.eventLocation ? `
              <div>
                <div class="label">Location</div>
                <div class="value">${data.eventLocation}</div>
              </div>
              ` : ''}
            </div>

            <p>We look forward to seeing you there!</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} KetamineAssociation.org</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  consultationRequest: (data: {
    practitionerName: string;
    patientName: string;
    notes?: string;
    dashboardUrl: string;
  }) => ({
    subject: `New Consultation Request from ${data.patientName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #334155; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0F7A7A 0%, #10B981 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px; border: 1px solid #E2E8F0; }
          .request-card { background: #F8FAFC; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .btn { display: inline-block; background: #0F7A7A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748B; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Consultation Request</h1>
          </div>
          <div class="content">
            <p>Hi ${data.practitionerName},</p>
            <p>You have received a new consultation request.</p>

            <div class="request-card">
              <p><strong>Patient:</strong> ${data.patientName}</p>
              ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
            </div>

            <p style="text-align: center; margin-top: 30px;">
              <a href="${data.dashboardUrl}" class="btn">View in Dashboard</a>
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} KetamineAssociation.org</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};
