import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { organizationSchema } from "../schemas/organization";
import withAuth from "../hoc/with-auth";

interface OrganizationFormData {
  rs: string;
  ice: string;
  cnss: string;
  address: string;
  email: string;
  responsibleName: string;
  trainingManagerName: string;
}

const OrganizationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = (data: OrganizationFormData) => {
    console.log(data);
  };

  return (
    <Card className="p-1 mb-6">
      <CardContent className="p-6">
        <p className="text-lg text-gray-950 font-bold mb-6">
          Sygafor informations
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6 ">
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              R.S <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("name")}
              placeholder="Enter the organization rs"
              className="bg-gray-100 mb-4 text-gray-950"
              error={errors.name?.message}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              ICE <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("ice")}
              placeholder="Enter the organization ICE"
              className="bg-gray-100 mb-4 text-gray-950"
              erroe={errors.ice?.message}
            />
            {errors.ice && (
              <span className="text-sm text-red-500">{errors.ice.message}</span>
            )}
          </div>
          <div className="flex flex-col w-3/4 ">
            <p className="text-sm text-gray-950">CNSS</p>
            <Input
              {...register("cnss")}
              placeholder="Enter the organization CNSS"
              className="bg-gray-100 mb-4 text-gray-950"
              error={errors.cnss?.message}
            />
            {errors.cnss && (
              <span className="text-sm text-red-500">
                {errors.cnss.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              Address <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("address")}
              placeholder="Enter the address of organization"
              className="bg-gray-100 mb-4 text-gray-950"
              error={errors.address?.message}
            />
            {errors.address && (
              <span className="text-sm text-red-500">
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              Phone <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("email")}
              placeholder="Enter the email of organization"
              className="bg-gray-100 mb-4 text-gray-950"
              error={errors.email?.message}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-950">
              Company Logo <span className="text-red-500">*</span>
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
                Upload the logo of company
              </label>
            </div>
          </div>

          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              Responsible Name <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("responsibleName")}
              placeholder="Enter the name of Responsible"
              className="bg-gray-100 mb-4 text-gray-950"
              error={errors.responsibleName?.message}
            />
            {errors.responsibleName && (
              <span className="text-sm text-red-500">
                {errors.responsibleName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-3/4">
            <p className="text-sm text-gray-950">
              Training Manager Name <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("trainingManagerName")}
              placeholder="Enter the name of training manager"
              className="bg-gray-100 mb-4 text-gray-950"
              error={errors.trainingManagerName?.message}
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

export default withAuth(OrganizationForm);
