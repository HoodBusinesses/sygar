import { Checkbox } from '../ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import ButtonsAction from '../organization/org-table-actions';
import DeleteModal from '../DeleteModal';
import SortHeader from '../costum-data/sort-header';

export interface Participant {
  id: number;
  name: string;
  email: string;
  cin: string;
  cnss: string;
  status: string;
}

export const participantColumns = (): ColumnDef<Participant>[] => [
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
      <div className="flex gap-2 items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          key="checkbox"
        />
        <p>{row.index + 1}</p>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <SortHeader
          isSomeSortSeted={!!column.getIsSorted()}
          resetFn={() => column.clearSorting()}
          OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          label="Name"
        />
      );
    },
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <SortHeader
          isSomeSortSeted={!!column.getIsSorted()}
          resetFn={() => column.clearSorting()}
          OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          label="Email"
        />
      );
    },
    cell: ({ row }) => <p>{row.getValue('email')}</p>,
  },
  {
    accessorKey: 'cin',
    header: 'CIN',
    cell: ({ row }) => <p>{row.getValue('cin')}</p>,
  },
  {
    accessorKey: 'cnss',
    header: 'CNSS',
    cell: ({ row }) => <p>{row.getValue('cnss')}</p>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <p>{row.getValue('status')}</p>,
  },
  {
    accessorKey: 'options',
    header: 'Options',
    cell: ({ row }) => (
      <ButtonsAction
        href={`/edit?type=participant&crud=edit`}
        rowId={row.original.id}
        subscription={false}
      />
    ),
  },
];
