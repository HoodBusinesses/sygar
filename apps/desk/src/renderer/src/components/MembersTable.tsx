import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from './ui/checkbox'
import DeleteModal from './DeleteModal'
import { Button } from './ui/button'

import { Edit2, Trash2 } from 'lucide-react'
import SelectInputItem from './ui/select-input-item'

export interface Member {
  id: number
  fullName: string
  email: string
  role: string
  actionType: string
}
export const membersColumn = (): ColumnDef<Member>[] => [
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
            DeleteNumber={table.getFilteredSelectedRowModel().rows.length}
            onDelete={() => {}}
          />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
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
    accessorKey: 'fullName',
    header: 'membersTable.fullName',
    cell: ({ row }) => <p className="text-gray-950 text-sm">{row.getValue('fullName')}</p>
  },
  {
    accessorKey: 'email',
    header: 'membersTable.email',
    cell: ({ row }) => <p className="text-gray-950 text-sm">{row.getValue('email')}</p>
  },
  {
    accessorKey: 'role',
    header: 'membersTable.role',
    cell: ({ row }) => (
      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
        {row.getValue('role')}
      </span>
    )
  },
  {
    accessorKey: 'actionType',
    header: 'membersTable.actionType',
    // cell: ({ row }) => (
    //   <SelectInputItem
    //     classNames={{
    //       trigger: 'bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium w-auto',
    //       content: 'bg-white text-gray-700'
    //     }}
    //   />
    // )
    cell: () => (<p>HELLO</p>)
  },
  {
    accessorKey: 'actions',
    header: 'membersTable.actions',
    cell: () => (
      <div className="py-3 px-4 flex gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log('edit')
          }}
          className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-200"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log('delete')
          }}
          className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }
]
