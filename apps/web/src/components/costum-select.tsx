
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select"

// TODO: Implement the following components

export type UserRole = 'Owner' | 'Admin' | 'User';
export type IdentifierType = 'CIN' | 'PASSPORT' | 'PERMIS';

const CostumSelect = ({value} : {value: IdentifierType}) => {

    return (
        <>
            <Select defaultValue={value}>
                <SelectTrigger className="">
                    <SelectValue placeholder={'role'} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectGroup>
                        <SelectItem value="CIN">CIN</SelectItem>
                        <SelectItem value="PASSPORT">passport</SelectItem>
                        <SelectItem value="PERMIS">permis</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default CostumSelect