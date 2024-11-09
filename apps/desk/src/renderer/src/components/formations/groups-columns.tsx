import { ColumnDef } from '@tanstack/react-table';
import DeleteModal from '../DeleteModal';
import ButtonsAction from '../organization/org-table-actions';
import { Checkbox } from '../ui/checkbox';
import SortHeader from '../costum-data/sort-header';

export interface Group {
  id: number;
  facilator: string;
  trainer: string;
  theme: string;
  location: string;
  date: string;
}

export const groupColumn = (
  setParticipants: () => void
): ColumnDef<Group>[] => [
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
        <p>{row.index + 1}</p>
      </div>
    ),
  },
  {
    accessorKey: 'facilator',
    header: ({ column }) => {
      return (
        <SortHeader
          isSomeSortSeted={!!column.getIsSorted()}
          resetFn={() => column.clearSorting()}
          OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          label="Facilator"
        />
      );
    },
    cell: ({ row }) => <p>{row.getValue('facilator')}</p>,
  },
  {
    accessorKey: 'trainer',
    header: ({ column }) => {
      return (
        <SortHeader
          isSomeSortSeted={!!column.getIsSorted()}
          resetFn={() => column.clearSorting()}
          OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          label="Trainer"
        />
      );
    },
    cell: ({ row }) => <p>{row.getValue('trainer')}</p>,
  },
  {
    accessorKey: 'theme',
    header: 'Theme',
    cell: ({ row }) => <p>{row.getValue('theme')}</p>,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <p>{row.getValue('location')}</p>,
  },
  {
    accessorKey: 'participant',
    header: 'Participant',
    cell: () => (
      <button
        onClick={setParticipants}
        className="hover:underline text-blue-500"
      >
        Participents
      </button>
    ),
  },
  {
    accessorKey: 'options',
    header: 'themesTable.options',
    cell: ({ row }) => (
      <ButtonsAction
        rowId={row.original.id}
        subscription={false}
        href={`/edit?type=group&crud=edit`}
      />
    ),
  },
];
