import { useTranslate } from "@renderer/hooks/useTranslate";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { Role } from "@renderer/store/slices/auth.slice";

// TODO: Implement the following components

const CostumSelect = ({value} : {value: Role}) => {
    const { t } = useTranslate();

    return (
        <>
            <Select defaultValue={value}>
                <SelectTrigger className="">
                    <SelectValue placeholder={t('themesTable.role')} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectGroup>
                        <SelectItem value="User">user</SelectItem>
                        <SelectItem value="Admin">admin</SelectItem>
                        <SelectItem value="Owner">owner</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default CostumSelect