import { Checkbox } from '../ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import ButtonsAction from '../organization/org-table-actions'

export interface Participant {
  id: number
  name: string
  email: string
  cin: string
  cnss: string
  status: string
}

export const participantColumns = (): ColumnDef<Participant>[] => [
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
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <p>{row.getValue('name')}</p>
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <p>{row.getValue('email')}</p>
  },
  {
    accessorKey: 'cin',
    header: 'CIN',
    cell: ({ row }) => <p>{row.getValue('cin')}</p>
  },
  {
    accessorKey: 'cnss',
    header: 'CNSS',
    cell: ({ row }) => <p>{row.getValue('cnss')}</p>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <p>{row.getValue('status')}</p>
  },
  {
    accessorKey: 'options',
    header: 'Options',
    cell: ({ row }) => <ButtonsAction participantId={row.original.id} subscription={false} />
  }
]
