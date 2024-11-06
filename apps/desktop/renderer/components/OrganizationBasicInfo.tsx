import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useFormContext } from "react-hook-form";
import type { OrganizationFormData } from "../schemas/organization";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";

export const OrganizationBasicInfo = (organization) => {
  const { t } = useTranslation();
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<OrganizationFormData>();

  
  useEffect(() => {
    if (organization) {
      setValue("name", organization?.organization?.rs);
      setValue("ice", organization?.organization?.ice);
      setValue("cnss", organization?.organization?.cnss);
      setValue("address", organization?.organization?.address);
      setValue("email", organization?.organization?.email);
      setValue("logo", organization?.organization?.logo);
      setValue("responsibleName", organization?.organization?.responsibleName);
      setValue("trainingManagerName", organization?.organization?.trainingManagerName);
      console.log("bbbbb ", organization?.organization);
      console.log(typeof(organization.organization));
      

    }
  }, [organization, setValue]);

  return (
    <Card className="p-1 mb-6">
      <CardContent className="p-6">
        <p className="text-lg text-gray-950 font-bold mb-6">
          {t('registration.basicInfo.title')}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6 ">
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              {t('registration.basicInfo.fields.rs.label')} <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("name")}
              value={organization?.organization?.rs || ""}
              placeholder={t('registration.basicInfo.fields.rs.placeholder')}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.name?.message}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              {t('registration.basicInfo.fields.ice.label')} <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("ice")}
              value={organization?.organization?.ice || ""}
              placeholder={t('registration.basicInfo.fields.ice.placeholder')}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.ice?.message}
            />
            {errors.ice && (
              <span className="text-sm text-red-500">{errors.ice.message}</span>
            )}
          </div>

          <div className="flex flex-col w-3/4 ">
            <p className="text-sm text-gray-950">{t('registration.basicInfo.fields.cnss.label')}</p>
            <Input
              {...register("cnss")}
              value={organization?.organization?.cnss || ""}
              placeholder={t('registration.basicInfo.fields.cnss.placeholder')}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.cnss?.message}
            />
            {errors.cnss && (
              <span className="text-sm text-red-500">
                {errors.cnss.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              {t('registration.basicInfo.fields.address.label')} <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("address")}
              value={organization?.organization?.address || ""}
              placeholder={t('registration.basicInfo.fields.address.placeholder')}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.address?.message}
            />
            {errors.address && (
              <span className="text-sm text-red-500">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              {t('registration.basicInfo.fields.email.label')} <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("email")}
              value={organization?.organization?.email || ""}
              placeholder={t('registration.basicInfo.fields.email.placeholder')}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.email?.message}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-gray-950">
              {t('registration.basicInfo.fields.logo.label')} <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 w-3/4">
              <input
                type="file"
                {...register("logo")}
                className="hidden"
                id="logo"
              />
              <label
                htmlFor="logo"
                className="text-sm text-gray-500 cursor-pointer"
              >
                {t('registration.basicInfo.fields.logo.placeholder')}
              </label>
            </div>
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              {t('registration.basicInfo.fields.responsibleName.label')} <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("responsibleName")}
              value={organization?.organization?.responsibleName || ""}
              placeholder={t('registration.basicInfo.fields.responsibleName.placeholder')}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.responsibleName?.message}
            />
            {errors.responsibleName && (
              <span className="text-sm text-red-500">
                {errors.responsibleName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              {t('registration.basicInfo.fields.trainingManagerName.label')} <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("trainingManagerName")}
              value={organization?.organization?.trainingManagerName || ""}
              placeholder={t('registration.basicInfo.fields.trainingManagerName.placeholder')}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.trainingManagerName?.message}
            />
            {errors.trainingManagerName && (
              <span className="text-sm text-red-500">
                {errors.trainingManagerName.message}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
