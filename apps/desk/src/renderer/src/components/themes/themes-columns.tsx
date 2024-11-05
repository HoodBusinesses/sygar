import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import ButtonsAction from '../organization/org-table-actions'

export interface Theme {
  id: number
  name: string
  identifier: string
  year: string
  price: number
}

export const themeColumns = (
  setEditTheme: () => void,
  setGroupThemes: () => void
): ColumnDef<Theme>[] => [
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => (
      <div>
        <Checkbox key="checkbox" />
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
    cell: ({ row }) => (
      <>
        <Button onClick={setGroupThemes} className="hover:underline text-blue-500 px-4 py-1">Groups</Button>
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
