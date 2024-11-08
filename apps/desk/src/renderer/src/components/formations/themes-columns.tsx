import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import ButtonsAction from '../organization/org-table-actions'
import DeleteModal from '../DeleteModal'

export interface Theme {
  id: number
  name: string
  identifier: string
  year: string
  price: number
  groups?: string
  options?: string
}

export const themeColumns = (setGroupThemes: () => void): ColumnDef<Theme>[] => [
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
            onDelete={() => {}}
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
      <button onClick={setGroupThemes} className="hover:underline text-blue-500 px-4 py-1">
        Groups
      </button>
    )
  },
  {
    accessorKey: 'options',
    header: 'themesTable.options',
    cell: ({ row }) => (
      <ButtonsAction
        rowId={row.original.id}
        subscription={false}
        href={`/edit?type=themes&crud=edit`}
      />
    )
  }
]
