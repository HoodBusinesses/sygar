import { Module, MiddlewareConsumer, Global } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageMiddleware } from '../middleware/language.middleware';

@Global()
@Module({
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*'); // Apply to all routes
  }
}
