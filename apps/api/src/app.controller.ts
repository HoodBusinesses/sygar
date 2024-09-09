import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('healthcheck')
  async status() {
    return {
      isValid: true,
    };
  }
}