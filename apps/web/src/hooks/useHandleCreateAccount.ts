import { organizationSchema, userSchema } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignup } from "./useSignUp";

export default function useHandleCreateAccount() {
    const [step, setStep] = useState(1);
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

    const mutation = useSignup({
        onSuccess: () => setStep(3)
    });


    const handleOrgSubmit = (data: OrgFormData) => {
        console.log(data);
        setStep(2);
    }

    const handlePersonSubmit = (data: PersonFormData) => {
        console.log(data);
        console.log('orgForm: ', orgMethods.getValues());
        setStep(2);
        const combinedData = {
            name: orgMethods.getValues("rs"),
            address: orgMethods.getValues("address"),
            cnss: orgMethods.getValues("cnss"),
            ice: orgMethods.getValues("ice"),
            owner: {
                cnss: data.cnss,
                identity: data.identity,
                identityType: data.identityType,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone
            }
        };
        console.log("combinedData", combinedData);
        mutation.mutate(combinedData);
    }
    return {
        orgMethods,
        personMethods,
        step,
        isPending: mutation.isPending,
        setStep,
        handleOrgSubmit,
        handlePersonSubmit
    }
}