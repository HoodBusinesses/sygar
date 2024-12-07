import { ColumnDef } from '@tanstack/react-table';
import DeleteModal from '../DeleteModal';
import ButtonsAction from '../organization/org-table-actions';
import { Checkbox } from '../ui/checkbox';
import SortHeader from '../costum-data/sort-header';
import RedirectButton from '../redirectButton';
import Paragraph from '../ui/Paragraph';

export interface Group {
  id: string;
  facilator: string;
  trainer: string;
  location: string;
}

export const groupColumn = (
  setParticipants: () => void,
  organizationId: string,
  themeId: string,
  setRowData: (rowData: Group) => void
): ColumnDef<Group>[] => { 
  return [
    {
      accessorKey: 'id',
      header: ({ table }) => (
        <div className="flex items-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
          <Paragraph paragraph={(row.index + 1).toString()} />
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
            label="group.fields.facilator.label"
          />
        );
      },
      cell: ({ row }) => <Paragraph paragraph={row.getValue('facilator')} />,
    },
    {
      accessorKey: 'trainer',
      header: ({ column }) => {
        return (
          <SortHeader
            isSomeSortSeted={!!column.getIsSorted()}
            resetFn={() => column.clearSorting()}
            OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            label="group.fields.trainer.label"
          />
        );
      },
      cell: ({ row }) => <Paragraph paragraph={row.getValue('trainer')} />,
    },
    {
      accessorKey: 'location',
      header: 'group.fields.location.label',
      cell: ({ row }) => <p>{row.getValue('location')}</p>,
    },
    {
      accessorKey: 'participant',
      header: 'participant.participant',
      cell: () => (
        <RedirectButton
          click={setParticipants}
          text="participant.participant"
        />
      ),
    },
    {
      accessorKey: 'options',
      header: 'themesTable.options',
      cell: ({ row }) => (
        <ButtonsAction
          endpoint={`group/${row.original.id}?organizationId=${organizationId}`}
          invalidateKeyData={['groupsData', organizationId, themeId]}
          saveDefaultData={setRowData.bind(null, row.original)}
          rowId={row.original.id}
          subscription={false}
        />
      ),
    },
  ];
}