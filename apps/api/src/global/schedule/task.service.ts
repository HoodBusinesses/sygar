import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  
  // Example of a task that runs every 10 seconds
  @Cron('*/10 * * * * *') // CRON job that runs every 10 seconds
  handleCron() {
    console.log('Task running every 10 seconds');
  }

  // Example of a task that runs every 5 seconds using an interval
  @Interval(5000) // Run this task every 5 seconds
  handleInterval() {
    console.log('Task running every 5 seconds');
  }

  // Example of a task that runs once, 10 seconds after application starts
  @Timeout(10000) // Run this task once after 10 seconds
  handleTimeout() {
    console.log('Task running after 10 seconds');
  }
}
