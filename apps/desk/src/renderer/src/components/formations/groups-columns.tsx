import { ColumnDef } from '@tanstack/react-table'
import DeleteModal from '../DeleteModal'
import ButtonsAction from '../organization/org-table-actions'
import { Checkbox } from '../ui/checkbox'

export interface Group {
  id: number
  facilator: string
  trainer: string
  theme: string
  location: string
  date: string
}

export const groupColumn = (setParticipants: () => void): ColumnDef<Group>[] => [
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
    accessorKey: 'participant',
    header: 'Participant',
    cell: () => (
        <button onClick={setParticipants} className="hover:underline text-blue-500">
          Participents
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
        setEditOrg={() => {
          console.log('first')
        }}
      />
    )
  }
]