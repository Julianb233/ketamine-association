// Base styles shared across all email templates
export const baseStyles = `
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #334155;
    margin: 0;
    padding: 0;
    background-color: #F8FAFC;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .header {
    background: linear-gradient(135deg, #0F7A7A 0%, #10B981 100%);
    padding: 40px 30px;
    text-align: center;
    border-radius: 12px 12px 0 0;
  }
  .header h1 {
    color: white;
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }
  .header p {
    color: rgba(255, 255, 255, 0.9);
    margin: 10px 0 0 0;
    font-size: 16px;
  }
  .content {
    background: white;
    padding: 30px;
    border: 1px solid #E2E8F0;
    border-top: none;
  }
  .card {
    background: #F8FAFC;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    border: 1px solid #E2E8F0;
  }
  .label {
    font-size: 12px;
    color: #64748B;
    text-transform: uppercase;
    margin-bottom: 4px;
    letter-spacing: 0.5px;
  }
  .value {
    font-size: 16px;
    color: #1E293B;
    font-weight: 600;
  }
  .btn {
    display: inline-block;
    background: #0F7A7A;
    color: white !important;
    padding: 14px 28px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
  }
  .btn:hover {
    background: #0D6969;
  }
  .btn-secondary {
    background: #F1F5F9;
    color: #334155 !important;
    border: 1px solid #E2E8F0;
  }
  .highlight {
    background: #F0FDF4;
    border-left: 4px solid #10B981;
    padding: 16px;
    margin: 20px 0;
    border-radius: 0 8px 8px 0;
  }
  .footer {
    text-align: center;
    padding: 20px 30px;
    color: #64748B;
    font-size: 14px;
    background: #F8FAFC;
    border-radius: 0 0 12px 12px;
    border: 1px solid #E2E8F0;
    border-top: none;
  }
  .footer a {
    color: #0F7A7A;
    text-decoration: none;
  }
  .divider {
    height: 1px;
    background: #E2E8F0;
    margin: 24px 0;
  }
  ul {
    padding-left: 20px;
    margin: 16px 0;
  }
  li {
    margin-bottom: 8px;
  }
`;

export const currentYear = new Date().getFullYear();

export function wrapEmailHtml(content: string, styles: string = baseStyles): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ketamine Association</title>
  <style>${styles}</style>
</head>
<body>
  ${content}
</body>
</html>
  `.trim();
}

export function emailFooter(): string {
  return `
    <div class="footer">
      <p>&copy; ${currentYear} KetamineAssociation.org</p>
      <p style="font-size: 12px; color: #94A3B8; margin-top: 8px;">
        This email was sent by the Ketamine Association.<br>
        <a href="https://ketamineassociation.org/unsubscribe">Unsubscribe</a> |
        <a href="https://ketamineassociation.org/privacy">Privacy Policy</a>
      </p>
    </div>
  `;
}
