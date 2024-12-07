import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@renderer/utils/schemas/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "../api/user/me";
import useUpdateUser from "../api/user/useUpdateUser";

export default function useHandleEditProfile(defaultValues: User) {
  const schema = profileSchema;

  type SchemaType = typeof schema;

  type FormData = z.infer<SchemaType>;

  const mutation = useUpdateUser();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = (data: FormData) => {
    mutation.mutate({
      userId: defaultValues?.id ?? '',
      data: {
        firstName:
          defaultValues.firstName === data.firstName
            ? undefined
            : data.firstName,
        lastName:
          defaultValues.lastName === data.lastName ? undefined : data.lastName,
        email: defaultValues.email === data.email ? undefined : data.email,
        //TODO: add phone
        // phone: data.phone
      },
    });
  };

  return {
    methods,
    isPending: mutation.isPending,
    handleSubmit,
  };
}