import { z } from 'zod';

// Sign in zod schema
export const signInSchema = z.object({
  login: z
    .string()
    .min(1, 'Email or phone number is required')
    .max(255, 'Email or phone number is too long')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(255, 'Password is too long')
});

  // Define the schema for form validation using Zod
  export const forgetPassSchema = z.object({
    email: z.string().email('Please enter a valid email address')
  });