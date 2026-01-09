import { baseStyles, wrapEmailHtml, emailFooter, currentYear } from './base-styles';

export interface EventRegistrationEmailData {
  name: string;
  email: string;
  eventTitle: string;
  eventDate: string;
  eventTime?: string;
  eventLocation?: string;
  virtualUrl?: string;
  isVirtual: boolean;
  registrationId: string;
  eventDescription?: string;
  calendarUrl?: string;
}

export function eventRegistrationEmail(data: EventRegistrationEmailData): { subject: string; html: string; text: string } {
  const {
    name,
    eventTitle,
    eventDate,
    eventTime,
    eventLocation,
    virtualUrl,
    isVirtual,
    registrationId,
    eventDescription,
    calendarUrl,
  } = data;

  const firstName = name.split(' ')[0] || name;
  const subject = `Registration Confirmed: ${eventTitle}`;

  const content = `
    <div class="container">
      <div class="header">
        <h1>You're Registered!</h1>
        <p>Your spot has been confirmed</p>
      </div>
      <div class="content">
        <p>Hi ${firstName},</p>
        <p>Great news! Your registration for the following event has been confirmed:</p>

        <div class="card">
          <div style="margin-bottom: 16px;">
            <div class="label">Event</div>
            <div class="value">${eventTitle}</div>
          </div>
          <div style="margin-bottom: 16px;">
            <div class="label">Date</div>
            <div class="value">${eventDate}${eventTime ? ` at ${eventTime}` : ''}</div>
          </div>
          ${isVirtual && virtualUrl ? `
          <div style="margin-bottom: 16px;">
            <div class="label">Join Link</div>
            <div class="value">
              <a href="${virtualUrl}" style="color: #0F7A7A; word-break: break-all;">${virtualUrl}</a>
            </div>
          </div>
          <div>
            <div class="label">Format</div>
            <div class="value">Virtual Event</div>
          </div>
          ` : eventLocation ? `
          <div style="margin-bottom: 16px;">
            <div class="label">Location</div>
            <div class="value">${eventLocation}</div>
          </div>
          <div>
            <div class="label">Format</div>
            <div class="value">In-Person Event</div>
          </div>
          ` : ''}
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #E2E8F0;">
            <div class="label">Confirmation Number</div>
            <div class="value" style="font-family: monospace;">${registrationId.slice(0, 8).toUpperCase()}</div>
          </div>
        </div>

        ${eventDescription ? `
        <div class="highlight">
          <strong>About This Event:</strong>
          <p style="margin: 8px 0 0 0;">${eventDescription}</p>
        </div>
        ` : ''}

        ${isVirtual ? `
        <div style="background: #FEF3C7; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <strong style="color: #92400E;">Virtual Event Reminder:</strong>
          <p style="margin: 8px 0 0 0; color: #92400E;">
            Please join the event 5-10 minutes early to test your connection.
            Make sure your camera and microphone are working properly.
          </p>
        </div>
        ` : `
        <div style="background: #EFF6FF; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <strong style="color: #1E40AF;">In-Person Event Tips:</strong>
          <p style="margin: 8px 0 0 0; color: #1E40AF;">
            Please arrive 15 minutes early for check-in.
            Bring a photo ID and this confirmation email.
          </p>
        </div>
        `}

        <p style="text-align: center; margin-top: 30px;">
          ${calendarUrl ? `<a href="${calendarUrl}" class="btn" style="margin-right: 10px;">Add to Calendar</a>` : ''}
          ${isVirtual && virtualUrl ? `<a href="${virtualUrl}" class="btn">Join Event</a>` : ''}
        </p>

        <div class="divider"></div>

        <p style="font-size: 14px; color: #64748B;">
          Need to cancel? Please let us know at least 24 hours in advance by replying to this email.
        </p>
      </div>
      ${emailFooter()}
    </div>
  `;

  const text = `
Registration Confirmed: ${eventTitle}

Hi ${firstName},

Your registration has been confirmed!

Event: ${eventTitle}
Date: ${eventDate}${eventTime ? ` at ${eventTime}` : ''}
${isVirtual && virtualUrl ? `Join Link: ${virtualUrl}` : eventLocation ? `Location: ${eventLocation}` : ''}
Format: ${isVirtual ? 'Virtual Event' : 'In-Person Event'}
Confirmation: ${registrationId.slice(0, 8).toUpperCase()}

${isVirtual
  ? 'Please join 5-10 minutes early to test your connection.'
  : 'Please arrive 15 minutes early for check-in. Bring a photo ID.'}

Need to cancel? Reply to this email at least 24 hours in advance.

(c) ${currentYear} KetamineAssociation.org
  `.trim();

  return {
    subject,
    html: wrapEmailHtml(content, baseStyles),
    text,
  };
}
