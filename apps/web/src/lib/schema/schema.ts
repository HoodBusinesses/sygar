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
    .max(255, 'Password is too long'),
});

// Step 1: Organization Information Schema
export const organizationSchema = z.object({
  rs: z.string().min(1, 'RS is required').max(255, 'RS is too long'),
  ice: z.string().min(1, 'ICE is required').max(255, 'ICE is too long'),
  cnss: z.string().min(1, 'CNSS is required').max(255, 'CNSS is too long'),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(500, 'Address is too long'),
  logo: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Logo is required')
    .optional(),
});

// Step 2: Personal Information Schema
export const personalSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(255, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(255, 'Last name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email is too long')
    .email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
  identityType: z
    .string()
    .min(1, 'Identity type is required')
    .max(50, 'Identity type is too long')
    .refine((value) => ['CIN', 'PERMIS', 'PASSPORT'].includes(value), {
      message: 'Identity type must be CIN, PERMIS, or PASSPORT',
    }),
  identity: z
    .string()
    .min(1, 'Identity number is required')
    .max(255, 'Identity number is too long'),
  cnss: z
    .string()
    .min(1, 'CNSS number is required')
    .max(255, 'CNSS number is too long'),
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Profile image is required')
    .optional(),
});

// Sign up schema
export const signUpSchema = z.object({
  organization: organizationSchema,
  personal: personalSchema,
});

// Define the schema for form validation using Zod
export const forgetPassSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPassSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
