import * as z from 'zod';


export type FieldsInput = {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  required?: boolean;
  isLogoInput?: boolean;
};


export const organizationSchema = z.object({
  rs: z.string().min(1, 'Organization rs is required'),
  ice: z.string().min(1, 'ICE is required'),
  cnss: z.string().min(1, 'CNSS is required'),
  address: z.string().min(1, 'Address is required'),
});

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  userCnss: z.string().min(1, 'CNSS is required'),
  identityType: z.string().min(1, 'Identity type is required'),
  identity: z.string().min(1, 'Identity is required'),
});

export const registrationFields: FieldsInput[] = [
  {
    label: 'RS',
    placeholder: 'Enter RS',
    name: 'rs',
    value: 'rs',
    required: true,
  },
  {
    label: 'ICE',
    placeholder: 'Enter ICE',
    name: 'ice',
    value: 'ice',
    required: true,
  },
  {
    label: 'CNSS',
    placeholder: 'Enter CNSS',
    name: 'cnss',
    value: 'cnss',
    required: true,
  },
  {
    label: 'Address',
    placeholder: 'Enter Address',
    name: 'address',
    value: 'address',
    required: true,
  },
  {
    label: 'Logo',
    placeholder: 'Upload Logo',
    name: 'logo',
    value: '',
    required: false,
    isLogoInput: true,
  },
];

export const PersonalInfosFields: FieldsInput[] = [
  {
    label: 'First Name',
    placeholder: 'Enter First Name',
    name: 'firstName',
    value: 'firstName',
    required: true,
  },
  {
    label: 'Last Name',
    placeholder: 'Enter Last Name',
    name: 'lastName',
    value: 'lastName',
    required: true,
  },
  {
    label: 'Email',
    placeholder: 'Enter Email',
    name: 'email',
    value: 'email',
    required: true,
  },
  {
    label: 'Phone Number',
    placeholder: 'Enter Phone Number',
    name: 'phoneNumber',
    value: 'phoneNumber',
    required: true,
  },
  {
    label: 'Identity Type',
    placeholder: 'Enter Identity Type (CIN, PERMIS, PASSPORT)',
    name: 'identityType',
    value: 'identityType',
    required: true,
  },
  {
    label: 'Identity',
    placeholder: 'Enter Identity Number',
    name: 'identity',
    value: 'identity',
    required: true,
  },
  {
    label: 'CNSS',
    placeholder: 'Enter CNSS Number',
    name: 'cnss',
    value: 'cnss',
    required: true,
  }
];


export type OrganizationFormData = z.infer<typeof organizationSchema>;
export type UserFormData = z.infer<typeof userSchema>;