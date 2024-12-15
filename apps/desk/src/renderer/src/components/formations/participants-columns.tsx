import { Checkbox } from '../ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import ButtonsAction from '../organization/org-table-actions';
import DeleteModal from '../DeleteModal';
import SortHeader from '../costum-data/sort-header';
import Paragraph from '../ui/Paragraph';

export interface Participant {
  id: string;
  name: string;
  email: string;
  cin: string;
  cnss: string;
  status: string;
}

export const participantColumns = (
  orgId: string,
  groupId: string,
  setRowData: (rowData: Participant) => void
): ColumnDef<Participant>[] => [
  {
    accessorKey: 'id',
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        {table.getIsAllPageRowsSelected() && (
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
        <Paragraph paragraph={(row.index + 1).toString()} />
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
          label="participant.fields.name.label"
        />
      );
    },
    cell: ({ row }) => <Paragraph paragraph={row.getValue('name')} />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <SortHeader
          isSomeSortSeted={!!column.getIsSorted()}
          resetFn={() => column.clearSorting()}
          OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          label="participant.fields.email.label"
        />
      );
    },
    cell: ({ row }) => <Paragraph paragraph={row.getValue('email')} />,
  },
  {
    accessorKey: 'cin',
    header: 'participant.fields.cin.label',
    cell: ({ row }) => <Paragraph paragraph={row.getValue('cin')} />,
  },
  {
    accessorKey: 'cnss',
    header: 'participant.fields.cnss.label',
    cell: ({ row }) => <Paragraph paragraph={row.getValue('cnss')} />,
  },
  {
    accessorKey: 'status',
    header: 'participant.fields.status.label',
    cell: ({ row }) => <Paragraph paragraph={row.getValue('status')} />,
  },
  {
    accessorKey: 'options',
    header: 'themesTable.options',
    cell: ({ row }) => (
      <ButtonsAction
        invalidateKeyData={['participantsData', orgId, groupId]}
        endpoint={`group-participants/${row.original.id}?organizationId=${orgId}`}
        saveDefaultData={setRowData.bind(null, row.original)}
        rowId={row.original.id}
        subscription={false}
      />
    ),
  },
];
