import { baseStyles, wrapEmailHtml, emailFooter, currentYear } from './base-styles';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
  isDigital?: boolean;
}

export interface OrderConfirmationEmailData {
  customerName: string;
  email: string;
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hasDigitalItems: boolean;
  hasPhysicalItems: boolean;
  estimatedDelivery?: string;
  trackingUrl?: string;
  downloadUrl?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function orderConfirmationEmail(data: OrderConfirmationEmailData): { subject: string; html: string; text: string } {
  const {
    customerName,
    orderId,
    items,
    subtotal,
    shipping,
    tax,
    total,
    shippingAddress,
    hasDigitalItems,
    hasPhysicalItems,
    estimatedDelivery,
    trackingUrl,
    downloadUrl,
  } = data;

  const firstName = customerName.split(' ')[0] || customerName;
  const subject = `Order Confirmed - #${orderId.slice(0, 8).toUpperCase()}`;

  const itemsHtml = items.map((item) => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #E2E8F0;">
        <div style="display: flex; align-items: center;">
          ${item.image ? `
          <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 16px;">
          ` : ''}
          <div>
            <div style="font-weight: 600; color: #1E293B;">${item.name}</div>
            <div style="font-size: 14px; color: #64748B;">Qty: ${item.quantity}</div>
            ${item.isDigital ? '<div style="font-size: 12px; color: #0F7A7A; margin-top: 4px;">Digital Download</div>' : ''}
          </div>
        </div>
      </td>
      <td style="padding: 16px 0; border-bottom: 1px solid #E2E8F0; text-align: right; font-weight: 600; color: #1E293B;">
        ${formatCurrency(item.price * item.quantity)}
      </td>
    </tr>
  `).join('');

  const content = `
    <div class="container">
      <div class="header">
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase</p>
      </div>
      <div class="content">
        <p>Hi ${firstName},</p>
        <p>Thank you for your order! We've received your purchase and ${hasPhysicalItems ? "will start processing it shortly" : "your digital items are ready"}.</p>

        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <div class="label">Order Number</div>
              <div class="value" style="font-family: monospace;">#${orderId.slice(0, 8).toUpperCase()}</div>
            </div>
            <div style="text-align: right;">
              <div class="label">Order Date</div>
              <div class="value">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>

          ${estimatedDelivery && hasPhysicalItems ? `
          <div style="background: #F0FDF4; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
            <div class="label" style="color: #166534;">Estimated Delivery</div>
            <div class="value" style="color: #166534;">${estimatedDelivery}</div>
          </div>
          ` : ''}
        </div>

        <h3 style="margin: 24px 0 16px 0; font-size: 18px; color: #1E293B;">Order Summary</h3>

        <table style="width: 100%; border-collapse: collapse;">
          ${itemsHtml}
        </table>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #E2E8F0;">
          <table style="width: 100%;">
            <tr>
              <td style="padding: 4px 0; color: #64748B;">Subtotal</td>
              <td style="padding: 4px 0; text-align: right; color: #1E293B;">${formatCurrency(subtotal)}</td>
            </tr>
            ${hasPhysicalItems ? `
            <tr>
              <td style="padding: 4px 0; color: #64748B;">Shipping</td>
              <td style="padding: 4px 0; text-align: right; color: #1E293B;">${shipping === 0 ? 'Free' : formatCurrency(shipping)}</td>
            </tr>
            ` : ''}
            ${tax > 0 ? `
            <tr>
              <td style="padding: 4px 0; color: #64748B;">Tax</td>
              <td style="padding: 4px 0; text-align: right; color: #1E293B;">${formatCurrency(tax)}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0 4px 0; font-weight: 700; font-size: 18px; color: #1E293B;">Total</td>
              <td style="padding: 12px 0 4px 0; text-align: right; font-weight: 700; font-size: 18px; color: #1E293B;">${formatCurrency(total)}</td>
            </tr>
          </table>
        </div>

        ${shippingAddress && hasPhysicalItems ? `
        <div class="card" style="margin-top: 24px;">
          <div class="label" style="margin-bottom: 8px;">Shipping Address</div>
          <div style="color: #1E293B;">
            ${shippingAddress.firstName} ${shippingAddress.lastName}<br>
            ${shippingAddress.address}${shippingAddress.apartment ? `, ${shippingAddress.apartment}` : ''}<br>
            ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}
          </div>
        </div>
        ` : ''}

        ${hasDigitalItems && downloadUrl ? `
        <div class="highlight">
          <strong>Your Digital Downloads Are Ready!</strong>
          <p style="margin: 8px 0 0 0;">
            Access your digital items anytime from your account dashboard.
          </p>
        </div>

        <p style="text-align: center; margin: 20px 0;">
          <a href="${downloadUrl}" class="btn">Download Now</a>
        </p>
        ` : ''}

        ${hasPhysicalItems && trackingUrl ? `
        <p style="text-align: center; margin-top: 30px;">
          <a href="${trackingUrl}" class="btn">Track Your Order</a>
        </p>
        ` : ''}

        <div class="divider"></div>

        <p style="font-size: 14px; color: #64748B;">
          Questions about your order? <a href="https://ketamineassociation.org/contact" style="color: #0F7A7A;">Contact our support team</a> or reply to this email.
        </p>
      </div>
      ${emailFooter()}
    </div>
  `;

  const text = `
Order Confirmed - #${orderId.slice(0, 8).toUpperCase()}

Hi ${firstName},

Thank you for your order!

Order Number: #${orderId.slice(0, 8).toUpperCase()}
Order Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
${estimatedDelivery && hasPhysicalItems ? `Estimated Delivery: ${estimatedDelivery}` : ''}

Order Summary:
${items.map((item) => `- ${item.name} x${item.quantity}: ${formatCurrency(item.price * item.quantity)}`).join('\n')}

Subtotal: ${formatCurrency(subtotal)}
${hasPhysicalItems ? `Shipping: ${shipping === 0 ? 'Free' : formatCurrency(shipping)}` : ''}
${tax > 0 ? `Tax: ${formatCurrency(tax)}` : ''}
Total: ${formatCurrency(total)}

${shippingAddress && hasPhysicalItems ? `
Shipping to:
${shippingAddress.firstName} ${shippingAddress.lastName}
${shippingAddress.address}${shippingAddress.apartment ? `, ${shippingAddress.apartment}` : ''}
${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}
` : ''}

${hasDigitalItems && downloadUrl ? `Download your items: ${downloadUrl}` : ''}
${hasPhysicalItems && trackingUrl ? `Track your order: ${trackingUrl}` : ''}

Questions? Contact us at support@ketamineassociation.org

(c) ${currentYear} KetamineAssociation.org
  `.trim();

  return {
    subject,
    html: wrapEmailHtml(content, baseStyles),
    text,
  };
}
