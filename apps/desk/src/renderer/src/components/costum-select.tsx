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

// TODO: Implement the following components

const CostumSelect = () => {
    const { t } = useTranslate();

    return (
        <>
            <Select>
                <SelectTrigger className="">
                    <SelectValue placeholder={t('themesTable.role')} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectGroup>
                        <SelectLabel>{t('themesTable.role')}</SelectLabel>
                        <SelectItem value="apple">user</SelectItem>
                        <SelectItem value="banana">admin</SelectItem>
                        <SelectItem value="blueberry">owner</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default CostumSelect