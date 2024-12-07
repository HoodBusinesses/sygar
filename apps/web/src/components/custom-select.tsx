
import { UseFormRegisterReturn } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { register } from "module";

// TODO: Implement the following components

interface CostumSelectProps {
    register: UseFormRegisterReturn;
    value: string;
    defaultValue?: string;
    placeholder: string;

}

export type UserRole = 'Owner' | 'Admin' | 'User';
export type IdentifierType = 'CIN' | 'PASSPORT' | 'PERMIS';

export default function CustomSelect({
    register,
    value,
    defaultValue,
    placeholder,
}: CostumSelectProps) {

    return (
        <>
            <Select
                defaultValue={value}
                onValueChange={(value) => {
                    register.onChange({ target: value }).then(() => {
                        console.log('Value changed to:', value);
                    }).catch((error) => {
                        console.error('Error changing value:', error);
                    });

                }}
            >
                <SelectTrigger className="">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectGroup>
                        {(['CIN', 'PASSPORT', 'PERMIS'] as IdentifierType[]).map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
