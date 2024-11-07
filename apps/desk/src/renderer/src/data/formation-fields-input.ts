export type FieldsInput = {
    name: string
    value: string
    label: string
    placeholder: string
    required?: boolean
}

export const participantFields: FieldsInput[] = [
    {
        label: 'participant.fields.name.label',
        placeholder: 'participant.fields.name.placeholder',
        name: 'name',
        value: 'name',
        required: true
    },
    {
        label: 'participant.fields.email.label',
        placeholder: 'participant.fields.email.placeholder',
        name: 'email',
        value: 'email',
        required: true
    },
    {
        label: 'participant.fields.cin.label',
        placeholder: 'participant.fields.cin.placeholder',
        name: 'cin',
        value: 'cin',
        required: true
    },
    {
        label: 'participant.fields.cnss.label',
        placeholder: 'participant.fields.cnss.placeholder',
        name: 'cnss',
        value: 'cnss',
        required: true
    },
    {
        label: 'participant.fields.status.label',
        placeholder: 'participant.fields.status.placeholder',
        name: 'status',
        value: 'status',
        required: true
    }
]

export const groupFields: FieldsInput[] = [
    {
        label: 'group.fields.formationName.label',
        placeholder: 'group.fields.formationName.placeholder',
        name: 'name',
        value: 'formationName',
        required: true
    },
    {
        label: 'group.fields.groupName.label',
        placeholder: 'group.fields.groupName.placeholder',
        name: 'groupName',
        value: 'groupName',
        required: true
    },
    {
        label: 'group.fields.year.label',
        placeholder: 'group.fields.year.placeholder',
        name: 'year',
        value: 'year',
        required: true
    },
    {
        label: 'group.fields.price.label',
        placeholder: 'group.fields.price.placeholder',
        name: 'price',
        value: 'price',
        required: true
    },
    {
        label: 'group.fields.date.label',
        placeholder: 'group.fields.date.placeholder',
        name: 'date',
        value: 'date',
        required: true
    }
]

export const formationFields: FieldsInput[] = [
    {
        label: 'formation.fields.formationName.label',
        placeholder: 'formation.fields.formationName.placeholder',
        name: 'name',
        value: 'formationName',
        required: true
    },
    {
        label: 'formation.fields.year.label',
        placeholder: 'formation.fields.year.placeholder',
        name: 'year',
        value: 'year',
        required: true
    },
    {
        label: 'formation.fields.price.label',
        placeholder: 'formation.fields.price.placeholder',
        name: 'price',
        value: 'price',
        required: true
    }
]