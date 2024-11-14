import { Injectable } from '@nestjs/common';
import * as crypto from 'bcryptjs';

@Injectable()
export class CryptService {
  /**
   * Compares a plaintext string with a hashed value to determine if they match.
   * Uses bcrypt's compare function for secure comparison.
   *
   * @param hash - The stored hashed value (e.g., from the database).
   * @param candidate - The plaintext string (e.g., user-provided password).
   * @returns A promise that resolves to true if the values match, otherwise false.
   */
  compare(hash: string, candidate: string): Promise<boolean> {
    return crypto.compare(candidate, hash);
  }

  /**
   * Hashes a plaintext string using bcrypt.
   * A salt factor can be provided; otherwise, it defaults to 12 for good security.
   *
   * @param text - The plaintext string to be hashed (e.g., password).
   * @param salt - Optional. The number of salt rounds for bcrypt (higher is more secure but slower).
   * @returns A promise that resolves to the hashed string.
   */
  hash(text: string, salt?: number): Promise<string> {
    // Hash the text with the provided salt rounds or default to 12
    return crypto.hash(text, salt || 12);
  }
}
