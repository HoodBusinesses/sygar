import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import DeleteModal from "../DeleteModal"
import { Button } from "../ui/button"
import { useTranslate } from "@renderer/hooks/useTranslate"

export interface Users {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
}



export const usersColumns = (): ColumnDef<Users>[] => {
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
            header: 'First Name',
            cell: ({ row }) => <p className="text-gray-600">{row.original.firstName}</p>
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
            cell: ({ row }) => <p className="text-gray-600">{row.original.lastName}</p>
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => <p className="text-gray-600">{row.original.email}</p>
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            cell: ({ row }) => <p className="text-gray-600">{row.original.phone}</p>
        },
        {
            accessorKey: 'permissions',
            header: t('themesTable.permission'),
            cell: () => (
                <Button
                    onClick={() => {
                        console.log("view permissions")}}
                    className="hover:underline text-blue-500 px-4 py-1"
                >
                    {t('themesTable.permission')}
                </Button>
            ),
        },

    ]
}