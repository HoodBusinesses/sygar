import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useFormContext } from "react-hook-form";
import type { OrganizationFormData } from "../schemas/organization";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";

export const ThemeBasicInfo = () => {
  const { t } = useTranslation();
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<OrganizationFormData>();

//   useEffect(() => {
//     if (organization) {
//       // setValue("name", organization?.organization?.rs);
//       // setValue("ice", organization?.organization?.ice);
//       // setValue("cnss", organization?.organization?.cnss);
//       // setValue("address", organization?.organization?.address);
//       // setValue("email", organization?.organization?.email);
//       // setValue("logo", organization?.organization?.logo);
//       // setValue("responsibleName", organization?.organization?.responsibleName);
//       // setValue("trainingManagerName", organization?.organization?.trainingManagerName);
//       console.log("bbbbb ", organization?.organization);
//       console.log(typeof organization.organization);
//     }
//   }, [organization, setValue]);

  return (
    <Card className="p-1 mb-6">
      <CardContent className="p-6">
        <p className="text-lg text-gray-950 font-bold mb-6">
          {t("theme.basicInfo.title")}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6 ">
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.fiscalYear")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("name")}
            //   value={organization?.organization?.rs || ""}
              placeholder={t("theme.basicInfo.fields.fiscalYear")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.name?.message}
            />
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.theme")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("ice")}
            //   value={organization?.organization?.ice || ""}
              placeholder={t("theme.basicInfo.fields.theme")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.ice?.message}
            />
          </div>

          <div className="flex flex-col w-3/4 ">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.action")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("cnss")}
            //   value={organization?.organization?.cnss || ""}
              placeholder={t("theme.basicInfo.fields.action")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.cnss?.message}
            />
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.date")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("address")}
            //   value={organization?.organization?.address || ""}
              placeholder={t("theme.basicInfo.fields.date")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.address?.message}
            />
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.trainer")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("email")}
            //   value={organization?.organization?.email || ""}
              placeholder={t("theme.basicInfo.fields.trainer")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.email?.message}
            />
          </div>
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.operator")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("responsibleName")}
            //   value={organization?.organization?.responsibleName || ""}
              placeholder={t("theme.basicInfo.fields.operator")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.responsibleName?.message}
            />
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.location")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("trainingManagerName")}
            //   value={organization?.organization?.trainingManagerName || ""}
              placeholder={t("theme.basicInfo.fields.location")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.trainingManagerName?.message}
            />
          </div>
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.costDay")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("trainingManagerName")}
            //   value={organization?.organization?.trainingManagerName || ""}
              placeholder={t("theme.basicInfo.fields.costDay")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.trainingManagerName?.message}
            />
          </div>
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
            {t("theme.basicInfo.fields.numParticipants")}{" "}
              <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("trainingManagerName")}
            //   value={organization?.organization?.trainingManagerName || ""}
              placeholder={t("theme.basicInfo.fields.numParticipants")}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.trainingManagerName?.message}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
