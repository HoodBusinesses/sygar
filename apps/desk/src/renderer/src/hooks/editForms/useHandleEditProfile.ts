import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "@renderer/components/formations/users-columns";
import { profileSchema } from "@renderer/utils/schemas/formSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useUpdateUser from "../api/user/useUpdateUser";

export default function useHandleEditProfile(defaultValues: Users) {
    const schema = profileSchema;

    type SchemaType = typeof schema;

    type FormData = z.infer<SchemaType>;

    const mutation = useUpdateUser();


    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = (data: FormData) => {
        console.log('data :::', defaultValues);
        mutation.mutate({
            userId: defaultValues?.id ?? '',
            data: {
              firstName: defaultValues.firstName === data.firstName ? undefined : data.firstName,
              lastName: defaultValues.lastName === data.lastName ? undefined : data.lastName,
              email:  defaultValues.email === data.email ? undefined : data.email,
              //TODO: add phone
              // phone: data.phone
            },
          });
    };


    const handleUnsavedChange = (data: FormData) => {
        // check if there is an empty field
        if (defaultValues) {
            const { id, ...values } = defaultValues;
            console.log('data : ', data);
            console.log('defaultValues jjjj: ', values);
            return JSON.stringify(data) !== JSON.stringify(values);
        }
    };

    const [openUnsavedChange, setOpenUnsavedChange] = useState(false);

    return {
        openUnsavedChange,
        setOpenUnsavedChange,
        methods,
        isPending: false,
        handleSubmit,
        handleUnsavedChange,
    };
}