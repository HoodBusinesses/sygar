import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "@renderer/components/formations/users-columns";
import { userSchema } from "@renderer/utils/schemas/formSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useHandleEditUser(defaultValues: Users | null, crud: string) {
    const schema = userSchema;

    type SchemaType = typeof schema;

    type FormData = z.infer<SchemaType>;

    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = (data: FormData) => {
        console.log('data :::', defaultValues);
    };


    const handleUnsavedChange = (data: FormData) => {
        // check if there is an empty field
        if (defaultValues && crud == 'edit') {
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
        handleSubmit,
        handleUnsavedChange,
    };
}