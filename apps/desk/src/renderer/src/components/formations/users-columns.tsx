import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import DeleteModal from "../DeleteModal"
import { Button } from "../ui/button"
import { useTranslate } from "@renderer/hooks/useTranslate"
import SortHeader from "../costum-data/sort-header"
import ButtonsAction from "../organization/org-table-actions"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

export interface Users {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    // role select
}



export const usersColumns = (setRowData: (rowData: Users) => void
): ColumnDef<Users>[] => {
    const { t } = useTranslate();

    return [
        {
            accessorKey: 'id',
            header: ({ table }) => (
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />

                    {table.getIsSomeRowsSelected() && (
                        <DeleteModal
                            DeleteNumber={table.getFilteredSelectedRowModel().rows.length}
                            onDelete={() => { }}
                        />
                    )}
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex gap-2 items-center">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        key="checkbox"
                    />
                    <p className="text-gray-600">{row.index + 1}</p>
                </div>
            ),
        },
        {
            accessorKey: 'firstName',
            header: ({ column }) => {
                return (
                    <SortHeader
                        isSomeSortSeted={!!column.getIsSorted()}
                        resetFn={() => column.clearSorting()}
                        OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        label={t('themesTable.firstName')}
                    />
                );
            },
            cell: ({ row }) => <p className="text-gray-600">{row.original.firstName}</p>
        },
        {
            accessorKey: 'lastName',
            header: ({ column }) => {
                return (
                    <SortHeader
                        isSomeSortSeted={!!column.getIsSorted()}
                        resetFn={() => column.clearSorting()}
                        OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        label={t('themesTable.lastName')}
                    />
                );
            },
            cell: ({ row }) => <p className="text-gray-600">{row.original.lastName}</p>
        },
        {
            accessorKey: 'email',
            header: ({ column }) => {
                return (
                    <SortHeader
                        isSomeSortSeted={!!column.getIsSorted()}
                        resetFn={() => column.clearSorting()}
                        OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        label={t('themesTable.email')}
                    />
                );
            },
            cell: ({ row }) => <p className="text-gray-600">{row.original.email}</p>
        },
        {
            accessorKey: 'phone',
            header: 'themesTable.phone',
            cell: ({ row }) => <p className="text-gray-600">{row.original.phone}</p>
        },
        {
            accessorKey: 'permissions',
            header: t('themesTable.permission'),
            cell: () => (
                <Button
                    onClick={() => {
                        console.log("view permissions")
                    }}
                    className="hover:underline text-blue-500 px-4 py-1"
                >
                    {t('themesTable.permission')}
                </Button>
            ),
        },
        {
            accessorKey: 'role',
            header: t('themesTable.role'),
            cell: () => (
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
            ),
        },
        {
            accessorKey: 'options',
            header: t('themesTable.options'),
            cell: ({ row }) => (
                <ButtonsAction
                    endpoint={`/theme/delete?uid=${row.original.id}`} // endpot /
                    invalidateKeyData='themesData'
                    saveDefaultData={setRowData.bind(null, row.original)}
                    rowId={row.original.id}
                    subscription={false}
                />
            ),
        },

    ]
}