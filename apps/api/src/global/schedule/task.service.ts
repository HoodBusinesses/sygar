import { Injectable } from '@nestjs/common';
import { scheduleJob, scheduledJobs } from 'node-schedule';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { Animator } from 'src/modules/organization/model/animator.model';
import { EnrolledType, Group } from 'src/modules/organization/model/group.model';
import { Formator } from 'src/modules/organization/model/formator.model';
import { Participant } from 'src/modules/organization/model/participant.model';

@Injectable()
export class TaskService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async scheduleRemainderEmail(id: string, date: Date, email: string, template: any) {
    // Schedule the job for the specific date
    scheduleJob(id, date, async () => {
      try {
        await this.mailService.sendEmail({
          from: this.configService.getOrThrow<string>('MAILER_USERNAME'),
          to: email,
          subject: template.subject,
          html: template.html
        });
      } catch (error) {
        console.error(`Failed to send reminder email ${id}:`, error);
      }
      console.debug(`Scheduled job ${id} completed`);
    });
  }

  // Optionally, add a method to cancel scheduled jobs
  cancelScheduledEmail(id: string) {
    const job = scheduledJobs[id];
    if (job) {
      job.cancel();
    }
  }

  async scheduleFormationReminder(enrolledType: EnrolledType, group: Group, resiver: Animator | Formator | Participant) {
    try {
        const oneWeekBefore = new Date(Number(group.startDate) - 7 * 24 * 60 * 60 * 1000); 
        const oneDayBefore = new Date(Number(group.startDate) - 24 * 60 * 60 * 1000);
        
        // Schedule one week reminder if it's still in the future
        console.log("oneWeekBefore", Number(oneWeekBefore), Date.now());
        console.log("oneWeekBefore > Date.now()", Number(oneWeekBefore) > Date.now());
        if (Number(oneWeekBefore) > Date.now()) {
            const template = {
                subject: 'Reminder: Formation Reminder',
                html: await this.mailService.getTemplate('formationReminderOneWeek')
            };

            template.html = template.html.replace('{{name}}', resiver.firstName + ' ' + resiver.lastName);
            template.html = template.html.replace('{{formationName}}', group.theme);
            template.html = template.html.replace('{{formationStartDate}}', new Date(Number(group.startDate)).toISOString());

            await this.scheduleRemainderEmail(
                `${enrolledType}-${resiver.email}-one-week`, 
                oneWeekBefore, 
                resiver.email, 
                template
            );
        }
        // Schedule one day reminder if it's still in the future
        if (Number(oneDayBefore) > Date.now()) {
            const template = {
                subject: 'Reminder: Formation Reminder',
                html: await this.mailService.getTemplate('formationReminderOneDay')
            };
            
            template.html = template.html.replace('{{name}}', resiver.firstName + ' ' + resiver.lastName);
            template.html = template.html.replace('{{formationName}}', group.theme);
            template.html = template.html.replace('{{formationStartDate}}', new Date(Number(group.startDate)).toISOString());

            await this.scheduleRemainderEmail(
                `${enrolledType}-${resiver.email}-one-day`, 
                oneDayBefore, 
                resiver.email, 
                template
            );
        }
        // If both reminders are in the past, send immediate "started" notification
        else {
            const template = {
                subject: 'Formation Started',
                html: await this.mailService.getTemplate('formationReminderStarted')
            };
            
            template.html = template.html.replace('{{name}}', resiver.firstName + ' ' + resiver.lastName);
            template.html = template.html.replace('{{formationName}}', group.theme);

            const startDate = new Date();
            startDate.setMilliseconds(startDate.getMilliseconds() + 50000);
            await this.scheduleRemainderEmail(
                `${enrolledType}-${resiver.email}-started`, 
                startDate, 
                resiver.email, 
                template
            );
        }
    } catch (error) {
        console.error('Error scheduling formation reminders:', error);
    }
  }
}
