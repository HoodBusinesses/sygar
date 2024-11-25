import * as z from 'zod';

export const organizationSchema = z.object({
  rs: z.string().min(1, 'Organization rs is required'),
  ice: z.string().min(1, 'ICE is required'),
  cnss: z.string().min(1, 'CNSS is required'),
  address: z.string().min(1, 'Address is required'),
});

export const memberSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['manager', 'employee'], {
    required_error: 'Role is required',
  }),
  actionType: z.enum(['edit', 'view'], {
    required_error: 'Action type is required',
  }),
});

export const formationSchema = z.object({
  name: z.string().min(1, 'Formation name is required'),
  year: z.string().min(1, 'Year is required'),
  price: z.string().min(1, 'Price is required'),
});

export const participantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  cin: z.string().min(1, 'CIN is required'),
  cnss: z.string().min(1, 'CNSS is required'),
  status: z.enum(['CTO', 'CEO'], {
    required_error: 'Status is required',
  }),
});

export const groupSchema = z.object({
  facilator: z.string().min(1, 'Facilator name is required'),
  trainer: z.string().min(1, 'trainer name is required'),
  theme: z.string().min(1, 'theme is required'),
  location: z.string().min(1, 'location is required'),
  date: z.string().min(1, 'Date is required'),
});

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  userCnss: z.string().min(1, 'CNSS is required'),
  identityType: z.string().min(1, 'Identity type is required'),
  identity: z.string().min(1, 'Identity is required'),
});

export const EditProfileSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'First name is required.' })
      .max(50, { message: 'First name must be at most 50 characters.' }),
    lastName: z
      .string()
      .min(1, { message: 'Last name is required.' })
      .max(50, { message: 'Last name must be at most 50 characters.' }),
    email: z
      .string()
      .email({ message: 'Invalid email address.' })
      .min(1, { message: 'Email is required.' }),
    // currentPassword: z
    //   .string()
    //   .min(6, { message: 'Current password must be at least 6 characters.' }),
    // newPassword: z
    //   .string()
    //   .min(6, { message: 'New password must be at least 6 characters.' }),
    // confirmPassword: z
    //   .string()
    //   .min(6, { message: 'Confirm password must be at least 6 characters.' }),
  })
  // .refine(
  //   (values) => {
  //     return values.newPassword === values.confirmPassword;
  //   },
  //   {
  //     message: 'Passwords must match!',
  //     path: ['confirmPassword'],
  //   }
  // );

export type OrganizationFormData = z.infer<typeof organizationSchema>;
export type MemberFormData = z.infer<typeof memberSchema>;
export type FormationFormData = z.infer<typeof formationSchema>;
export type ParticipantFormData = z.infer<typeof participantSchema>;
export type GroupFormData = z.infer<typeof groupSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type EditProfileFormData = z.infer<typeof EditProfileSchema>;
