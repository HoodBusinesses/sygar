import { Checkbox } from '@radix-ui/react-checkbox'
import { ColumnDef } from '@tanstack/react-table'
import ButtonsAction from '../organization/org-table-actions'

export interface Group {
  id: number
  facilator: string
  trainer: string
  theme: string
  location: string
  date: string
}

export const groupColumn = (): ColumnDef<Group>[] => [
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => (
      <div>
        <Checkbox key={'checkbox'} />
        <p>{row.getValue('id')}</p>
      </div>
    )
  },
  {
    accessorKey: 'facilator',
    header: 'Facilator',
    cell: ({ row }) => <p>{row.getValue('facilator')}</p>
  },
  {
    accessorKey: 'trainer',
    header: 'Trainer',
    cell: ({ row }) => <p>{row.getValue('trainer')}</p>
  },
  {
    accessorKey: 'theme',
    header: 'Theme',
    cell: ({ row }) => <p>{row.getValue('theme')}</p>
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <p>{row.getValue('location')}</p>
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <p>{row.getValue('date')}</p>
  },
  {
    accessorKey: 'options',
    header: 'themesTable.options',
    cell: ({ row }) => (
      <ButtonsAction
        rowId={row.original.id}
        subscription={false}
        setEditOrg={() => {
          console.log('first')
        }}
      />
    )
  }
]
