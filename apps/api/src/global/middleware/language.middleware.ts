import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the 'language' property
declare global {
  namespace Express {
    interface Request {
      language?: string; // Optional property
    }
  }
}

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const lang = req.headers['accept-language'] || 'en'; // Default to English
    req['language'] = lang; // Store language in request object
    next();
  }
}