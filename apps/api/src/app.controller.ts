import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get('healthcheck')
  @ApiResponse({
    status: 200,
    description: 'Health check successful.',
    schema: {
      example: { isValid: true },
    },
  })
  async status() {
    return {
      isValid: true,
    };
  }
}
