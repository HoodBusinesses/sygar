import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { GroupFormData } from '@renderer/utils/schemas/formSchema';
import FormInputItem from '../ui/form-input-item';
import { groupFields } from '@renderer/data/formation-fields-input';
import { useTranslate } from '@renderer/hooks/useTranslate';

interface EditGroupProps {
  crud : string;
  defaultValues: any;
}

const EditGroup = ({ crud , defaultValues }: EditGroupProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext<GroupFormData>();
  const { t } = useTranslate();
  console.log("defaultValue : ",defaultValues);
  return (
    <Card className="">
      <CardHeader className="text-gray-700 text-xl">
        {t(`group.${crud}Group`)}
      </CardHeader>

      <CardContent className="">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {groupFields.map((field) => (
            <FormInputItem
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register(field.name as keyof GroupFormData)}
              value={defaultValues[field.name] || ''}
              error={errors[field.name]?.message}
              isLargeInput={true}
              required={field.required}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditGroup;
