import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailOptionsInterface } from '../../shared/types/mail';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Service for sending emails using nodemailer.
 */
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  /**
   * Initializes the mail service with SMTP configuration from the ConfigService.
   *
   * @param configService - The ConfigService instance.
   */
  constructor(private readonly configService: ConfigService) {
    // Create a transporter for sending emails using nodemailer
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('MAILER_HOST'),
      port: this.configService.getOrThrow<number>('MAILER_PORT'),
      auth: {
        user: this.configService.getOrThrow<string>('MAILER_USERNAME'),
        pass: this.configService.getOrThrow<string>('MAILER_PASSWORD'),
      },
    });
  }

  /**
   * Sends an email using the configured transporter.
   *
   * @param options - The email options including the recipient, subject, and message.
   * @returns A Promise that resolves when the email is sent.
   * @throws Error if the email fails to send.
   */
  async sendEmail(options: MailOptionsInterface): Promise<void> {
    try {
      await this.transporter.sendMail(options);``
      // console.log('Email sent successfully');
    } catch (error) {
      // console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async getTemplate(template: string): Promise<string> {
    const templatePath = join(process.cwd(), 'src/templates', `${template}.html`);
    return readFile(templatePath, 'utf8');
  }
}
