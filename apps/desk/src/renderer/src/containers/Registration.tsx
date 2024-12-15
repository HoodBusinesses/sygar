import { Button } from '@renderer/components/ui/button';
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card';
import FormInputItem from '@renderer/components/ui/form-input-item';
import MainSelect from '@renderer/components/ui/main-select';
import PhoneInputItem from '@renderer/components/ui/phone-input-item';
import {
  registrationFields,
  userFields,
} from '@renderer/data/organinzation-fields-input';
import withAuth from '@renderer/hoc/with-auth';
import useHandleEditRegAndOwner from '@renderer/hooks/editForms/useHandleEditRegAndOwner';
import { useTranslate } from '@renderer/hooks/useTranslate';
import {
  OrganizationFormData,
  UserFormData,
} from '@renderer/utils/schemas/formSchema';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';

const Registration: React.FC = () => {
  const { t } = useTranslate();
  // get members , form provider method, and submit handler
  const { control, register, formState, onSubmit, isPending, handleSubmit } =
    useHandleEditRegAndOwner();

  return (
    <div className="p-4 w-full py-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-950">
        {t('registration.registration')}{' '}
        <span className="text-sm rounded-sm bg-blue-100  text-blue-600">
          {t('registration.title')}
        </span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 justify-center flex flex-col"
      >
        <Card className="flex flex-col gap-4 p-2">
          <CardHeader className="text-sm rounded-sm font-bold  py-2 w-fit">
            {t('registration.MembersInfos')}
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-3 gap-4">
              {registrationFields.map((field) => (
                <FormInputItem
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={register(field.name as keyof OrganizationFormData)}
                  value={''}
                  error={formState.errors[field.name]?.message}
                  required={field.required}
                  isLogoInput={field.isLogoInput}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col p-2 gap-4">
          <CardHeader className="text-sm rounded-sm font-bold py-2 w-fit">
            {t('registration.ownerInfo')}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {userFields.map((field) =>
                field.name === 'phone' ? (
                  <Controller
                    key={field.name}
                    name={field.name as keyof UserFormData}
                    control={control}
                    render={({ field: fields }) => (
                      <PhoneInputItem
                        value={fields.value}
                        onChange={fields.onChange}
                        error={formState.errors[field.name]?.message}
                        required={field.required}
                        label={field.label}
                        defaultValue="ma"
                      />
                    )}
                  />
                ) : field.isSelect ? (
                  <Controller
                    name={field.name as keyof UserFormData}
                    control={control}
                    render={({ field: fields }) => (
                      <MainSelect
                        label={field.label}
                        placeholder={field.placeholder}
                        options={field.options!}
                        value={fields.value}
                        onChange={fields.onChange}
                        error={formState.errors[field.name]?.message}
                        required={field.required}
                      />
                    )}
                  />
                ) : (
                  <FormInputItem
                    key={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    register={register(field.name as keyof UserFormData)}
                    value={''}
                    error={formState.errors[field.name]?.message}
                    isLargeInput={true}
                    required={field.required}
                  />
                )
              )}
            </div>
          </CardContent>
        </Card>
        <Button
          type="submit"
          className="custom-button bg-blue-600 w-1/4 self-center"
          disabled={isPending}
        >
          {isPending ? <FaSpinner className="" /> : t('buttons.save')}
        </Button>
      </form>
    </div>
  );
};

export default withAuth(Registration);
