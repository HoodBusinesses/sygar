import { ColumnDef } from '@tanstack/react-table'
import DeleteModal from '../DeleteModal'
import ButtonsAction from '../organization/org-table-actions'
import { Checkbox } from '../ui/checkbox'

export interface Theme {
  id: number
  name: string
  identifier: string
  year: string
  price: number
}

export const themeColumns = (setEditTheme: () => void, setGroupThemes: () => void): ColumnDef<Theme>[] => [
  {
    accessorKey: 'id',
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />

        {table.getIsSomeRowsSelected() && (
          <DeleteModal
            ConfirmDeleteAll={table.getFilteredSelectedRowModel().rows.length}
            onDelete={() => {}}
          />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          key="checkbox"
        />
        <p>{row.getValue('id')}</p>
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: 'themesTable.name',
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('name')}</p>
  },
  {
    accessorKey: 'year',
    header: 'themesTable.year',
    cell: ({ row }) => <p>{row.getValue('year')}</p>
  },
  {
    accessorKey: 'price',
    header: 'themesTable.price',
    cell: ({ row }) => <p>{row.getValue('price')}</p>
  },
  {
    accessorKey: 'groups',
    header: 'themesTable.groups',
    cell: () => (
      <>
        <button onClick={setGroupThemes} className="hover:underline text-blue-500 py-1">
          Groups
        </button>
      </>
    )
  },
  {
    accessorKey: 'options',
    header: 'themesTable.options',
    cell: ({ row }) => (
      <ButtonsAction rowId={row.original.id} subscription={false} setEditOrg={setEditTheme} />
    )
  }
]
