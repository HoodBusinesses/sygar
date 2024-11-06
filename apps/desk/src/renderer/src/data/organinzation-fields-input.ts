// Define the array of fields
export type OrganizationFieldsInput = {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  required?: boolean;
  isLogoInput?: boolean;
}
export const fields: OrganizationFieldsInput[] = [
  {
    label: 'registration.basicInfo.fields.rs.label',
    placeholder: 'registration.basicInfo.fields.rs.placeholder',
    name: 'name',
    value: 'rs',
    required: true
  },
  {
    label: 'registration.basicInfo.fields.ice.label',
    placeholder: 'registration.basicInfo.fields.ice.placeholder',
    name: 'ice',
    value: 'ice',
    required: true
  },
  {
    label: 'registration.basicInfo.fields.cnss.label',
    placeholder: 'registration.basicInfo.fields.cnss.placeholder',
    name: 'cnss',
    value: 'cnss',
    required: true
  },
  {
    label: 'registration.basicInfo.fields.address.label',
    placeholder: 'registration.basicInfo.fields.address.placeholder',
    name: 'address',
    value: 'address',
    required: true
  },
  {
    label: 'registration.basicInfo.fields.email.label',
    placeholder: 'registration.basicInfo.fields.email.placeholder',
    name: 'email',
    value: 'email',
    required: true
  },
  {
    label: 'registration.basicInfo.fields.logo.label',
    placeholder: 'registration.basicInfo.fields.logo.placeholder',
    name: 'logo',
    value: '',
    required: true,
    isLogoInput: true
  },
  {
    label: 'registration.basicInfo.fields.responsibleName.label',
    placeholder: 'registration.basicInfo.fields.responsibleName.placeholder',
    name: 'responsibleName',
    value: 'responsibleName',
    required: true
  },
  {
    label: 'registration.basicInfo.fields.trainingManagerName.label',
    placeholder: 'registration.basicInfo.fields.trainingManagerName.placeholder',
    name: 'trainingManagerName',
    value: 'trainingManagerName',
    required: true
  }
]
