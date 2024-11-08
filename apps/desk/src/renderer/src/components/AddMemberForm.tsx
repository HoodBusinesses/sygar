import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { memberSchema, type MemberFormData } from '../utils/schemas/formSchema';
import { Button } from './ui/button';
import FormInputItem from './ui/form-input-item';
import SelectInputItem from './ui/select-input-item';

interface AddMemberFormProps {
  onSubmit: (data: MemberFormData) => void;
  initialData?: MemberFormData;
}

export const AddMemberForm = ({
  onSubmit,
  initialData,
}: AddMemberFormProps): JSX.Element => {
  const { t } = useTranslation(); // Hook for translations

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: MemberFormData): void => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="grid grid-cols-5 gap-4 mt-4">
      <FormInputItem
        label={'membersTable.fullName'}
        placeholder={'placeholders.fullName'}
        register={register('fullName')}
        value={''}
        error={errors['fullName']?.message}
      />

      <FormInputItem
        label={'membersTable.email'}
        placeholder={'placeholders.email'}
        register={register('email')}
        value={''}
        error={errors['email']?.message}
      />

      <SelectInputItem
        label={'membersTable.role'}
        placeholder={'placeholders.selectRole'}
        onValueChange={(value) =>
          register('role').onChange({ target: { value } })
        }
        error={errors['role']?.message}
        items={[
          { value: 'manager', translationKey: 'roles.manager' },
          { value: 'employee', translationKey: 'roles.employee' },
        ]}
      />

      <SelectInputItem
        label={'membersTable.actionType'}
        placeholder={'placeholders.selectActionType'}
        onValueChange={(value) =>
          register('actionType').onChange({ target: { value } })
        }
        error={errors['actionType']?.message}
        items={[
          { value: 'edit', translationKey: 'actionTypes.edit' },
          { value: 'view', translationKey: 'actionTypes.view' },
        ]}
      />

      <Button
        type="button"
        onClick={handleSubmit(handleFormSubmit)}
        className="btn-blue mb-4 w-32 rounded-md self-center "
      >
        {t('buttons.add')} {/* Translated button label */}
      </Button>
    </div>
  );
};
