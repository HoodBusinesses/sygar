import { organizationSchema, userSchema } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useHandleCreateAccount() {
    const orgSchema = organizationSchema;
    const personSchema = userSchema;

    type OrgSchemaType = typeof orgSchema;
    type PersonSchemaType = typeof personSchema;

    type OrgFormData = z.infer<OrgSchemaType>;
    type PersonFormData = z.infer<PersonSchemaType>;


    const orgMethods = useForm<OrgFormData>({
        resolver: zodResolver(orgSchema)
    });
    const personMethods = useForm<PersonFormData>({
        resolver: zodResolver(personSchema)
    });

    const [step, setStep] = useState(1);

    const handleOrgSubmit = (data: OrgFormData) => {
        console.log(data);
        setStep(2);
    }

    const handlePersonSubmit = (data: PersonFormData) => {
        console.log(data);
        setStep(2);
    }
}