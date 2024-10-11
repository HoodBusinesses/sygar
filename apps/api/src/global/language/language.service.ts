import { Injectable } from '@nestjs/common';
import * as en from './locales/en.json';
import * as fr from './locales/fr.json';
import * as ar from './locales/ar.json';

@Injectable()
export class LanguageService {
  private translations: Record<string, Record<string, string>> = {
    en,
    fr,
    ar,
  };

  getTranslation(key: string, lang: string): string {
    return this.translations[lang]?.[key] || this.translations['en']?.[key] || key; // Fallback to English
  }
} 