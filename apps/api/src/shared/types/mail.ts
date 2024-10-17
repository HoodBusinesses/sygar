/**
 * Interface for defining email options.
 */
export interface MailOptionsInterface {
  /**
   * The email sender.
   */
  from: string;
  /**
   * The email recipient.
   */
  to: string;
  /**
   * The email subject.
   */
  subject: string;
  /**
   * The plain text content of the email.
   */
  text?: string;
  /**
   * The HTML content of the email.
   */
  html?: string;
}
