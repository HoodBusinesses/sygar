import { Injectable } from '@nestjs/common';
import * as crypto from 'bcryptjs';

@Injectable()
export class EncryptionService {
	compare(hash: string, candidate: string): Promise<boolean> {
		return crypto.compare(candidate, hash);
	}

	hash(text: string, salt?: number): Promise<string> {
		return crypto.hash(text, salt || 12);
	}
}
