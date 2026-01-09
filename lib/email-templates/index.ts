// Email templates index - re-export all templates
export { welcomeEmail, type WelcomeEmailData } from './welcome';
export { eventRegistrationEmail, type EventRegistrationEmailData } from './event-registration';
export {
  consultationRequestEmail,
  consultationConfirmationEmail,
  type ConsultationRequestEmailData,
  type ConsultationConfirmationEmailData,
} from './consultation-request';
export {
  orderConfirmationEmail,
  type OrderConfirmationEmailData,
  type OrderItem,
} from './order-confirmation';
export { baseStyles, wrapEmailHtml, emailFooter, currentYear } from './base-styles';
