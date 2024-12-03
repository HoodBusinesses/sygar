// Define the array of fields
export type OrganizationFieldsInput = {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  isSelect?: boolean;
  options?: { value: string; label: string }[];
  required?: boolean;
  isLogoInput?: boolean;
};


export const registrationFields: OrganizationFieldsInput[] = [
  {
    label: 'registration.basicInfo.fields.rs.label',
    placeholder: 'registration.basicInfo.fields.rs.placeholder',
    name: 'rs',
    value: 'rs',
    required: true,
  },
  {
    label: 'registration.basicInfo.fields.ice.label',
    placeholder: 'registration.basicInfo.fields.ice.placeholder',
    name: 'ice',
    value: 'ice',
    required: true,
  },
  {
    label: 'registration.basicInfo.fields.cnss.label',
    placeholder: 'registration.basicInfo.fields.cnss.placeholder',
    name: 'cnss',
    value: 'cnss',
    required: true,
  },
  {
    label: 'registration.basicInfo.fields.address.label',
    placeholder: 'registration.basicInfo.fields.address.placeholder',
    name: 'address',
    value: 'address',
    required: true,
  },
  {
    label: 'registration.basicInfo.fields.logo.label',
    placeholder: 'registration.basicInfo.fields.logo.placeholder',
    name: 'logo',
    value: '',
    required: false,
    isLogoInput: true,
  },
];

export const fields: OrganizationFieldsInput[] = [
  {
    label: 'registration.basicInfo.fields.rs.label',
    placeholder: 'registration.basicInfo.fields.rs.placeholder',
    name: 'rs',
    value: 'rs',
    required: true,
  },
  {
    label: 'registration.basicInfo.fields.ice.label',
    placeholder: 'registration.basicInfo.fields.ice.placeholder',
    name: 'ice',
    value: 'ice',
    required: true,
  },
  {
    label: 'registration.basicInfo.fields.cnss.label',
    placeholder: 'registration.basicInfo.fields.cnss.placeholder',
    name: 'cnss',
    value: 'cnss',
    required: true,
  },
  {
    label: 'registration.basicInfo.fields.address.label',
    placeholder: 'registration.basicInfo.fields.address.placeholder',
    name: 'address',
    value: 'address',
    required: true,
  },
  {
    label: 'registration.basicInfo.fields.logo.label',
    placeholder: 'registration.basicInfo.fields.logo.placeholder',
    name: 'logo',
    value: '',
    required: false,
    isLogoInput: true,
  },
];


export const userFields: OrganizationFieldsInput[] = [
  {
    label: 'user.fields.firstName.label',
    placeholder: 'user.fields.firstName.placeholder',
    name: 'firstName',
    value: 'firstName',
    required: true,
  },
  {
    label: 'user.fields.lastName.label',
    placeholder: 'user.fields.lastName.placeholder',
    name: 'lastName',
    value: 'lastName',
    required: true,
  },
  {
    label: 'user.fields.email.label',
    placeholder: 'user.fields.email.placeholder',
    name: 'email',
    value: 'email',
    required: true,
  },
  {
    label: 'user.fields.phone.label',
    placeholder: 'user.fields.phone.placeholder',
    name: 'phone',
    value: 'phone',
    required: true,
  },
  {
    label: 'user.fields.userCnss.label',
    placeholder: 'user.fields.userCnss.placeholder',
    name: 'userCnss',
    value: 'userCnss',
    required: true,
  },
  {
    label: 'user.fields.identityType.label',
    placeholder: 'Select Identity Type',
    name: 'identityType',
    value: 'identityType',
    isSelect: true,
    options: [
      { value: 'CIN', label: 'CIN' },
      { value: 'PASSPORT', label: 'PASSPORT' },
    ],
    required: true,
  },
  {
    label: 'user.fields.identity.label',
    placeholder: 'user.fields.identity.placeholder',
    name: 'identity',
    value: 'identity',
    required: true,
  },
];

export const profileFields: OrganizationFieldsInput[] = [
  {
    label: 'user.fields.firstName.label',
    placeholder: 'user.fields.firstName.placeholder',
    name: 'firstName',
    value: 'firstName',
    required: true,
  },
  {
    label: 'user.fields.lastName.label',
    placeholder: 'user.fields.lastName.placeholder',
    name: 'lastName',
    value: 'lastName',
    required: true,
  },
  {
    label: 'user.fields.email.label',
    placeholder: 'user.fields.email.placeholder',
    name: 'email',
    value: 'email',
    required: true,
  },
];