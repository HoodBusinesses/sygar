export type FieldsInput = {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  type?: string;
  isSelect?: boolean;
  required?: boolean;
  options?: { value: string; label: string }[];
  onlyAdd?: boolean;
};

export const participantFields: FieldsInput[] = [
  {
    label: 'participant.fields.name.label',
    placeholder: 'participant.fields.name.placeholder',
    name: 'name',
    value: 'name',
    required: true,
  },
  {
    label: 'participant.fields.email.label',
    placeholder: 'participant.fields.email.placeholder',
    name: 'email',
    value: 'email',
    required: true,
  },
  {
    label: 'participant.fields.cin.label',
    placeholder: 'participant.fields.cin.placeholder',
    name: 'cin',
    value: 'cin',
    required: true,
  },
  {
    label: 'participant.fields.cnss.label',
    placeholder: 'participant.fields.cnss.placeholder',
    name: 'cnss',
    value: 'cnss',
    required: true,
  },
  {
    label: 'participant.fields.status.label',
    placeholder: 'participant.fields.status.placeholder',
    name: 'status',
    value: 'status',
    required: true,
  },
];

export const groupFields: FieldsInput[] = [
  {
    label: 'group.fields.facilator.label',
    placeholder: 'group.fields.facilator.placeholder',
    name: 'facilator',
    value: 'facilator',
    required: true,
  },
  {
    label: 'group.fields.trainer.label',
    placeholder: 'group.fields.trainer.placeholder',
    name: 'trainer',
    value: 'trainer',
    required: true,
  },
  {
    label: 'group.fields.location.label',
    placeholder: 'group.fields.location.placeholder',
    name: 'location',
    value: 'location',
    required: true,
  },
];

export const formationFields: FieldsInput[] = [
  {
    label: 'formation.fields.formationName.label',
    placeholder: 'formation.fields.formationName.placeholder',
    name: 'name',
    value: 'formationName',
    required: true,
  },
  {
    label: 'formation.fields.year.label',
    placeholder: 'formation.fields.year.placeholder',
    name: 'year',
    value: 'year',
    type: 'number',
    required: true,
  },
  {
    label: 'formation.fields.price.label',
    placeholder: 'formation.fields.price.placeholder',
    name: 'price',
    value: 'price',
    type: 'text',
    required: true,
  },
];

export const usersFields: FieldsInput[] = [
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
    label: 'user.fields.phone.label',
    placeholder: 'user.fields.phone.placeholder',
    name: 'phone',
    value: 'phone',
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
    label: 'user.fields.userCnss.label',
    placeholder: 'user.fields.userCnss.placeholder',
    name: 'userCnss',
    value: 'userCnss',
    required: true,
    onlyAdd: true,
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
    onlyAdd: true,
  },
  {
    label: 'user.fields.identity.label',
    placeholder: 'user.fields.identity.placeholder',
    name: 'identity',
    value: 'identity',
    required: true,
    onlyAdd: true,
  },
  {
    // role
    label: 'user.fields.role.label',
    placeholder: 'Select Role',
    name: 'role',
    value: 'role',
    isSelect: true,
    onlyAdd: true,
    options: [
      { value: 'Admin', label: 'Admin' },
      { value: 'User', label: 'User' },
      { value: 'Owner', label: 'Owner' },
    ],
    required: true,
  },
];