import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import ButtonsAction from '../organization/org-table-actions';
import DeleteModal from '../DeleteModal';
import SortHeader from '../costum-data/sort-header';
import RedirectButton from '../redirectButton';

export interface Theme {
  id: string;
  name: string;
  year: string;
  price: string;
}

export const themeColumns = (
  setGroupThemes: (themeId: string, orgId: string) => void,
  orgId: string,
  setRowData: (rowData: Theme) => void
): ColumnDef<Theme>[] => {
  return [
    {
      accessorKey: 'id',
      header: ({ table }) => (
        <div className="flex items-center gap-2">
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
            label={'themesTable.name'}
          />
        );
      },
      cell: ({ row }) => (
        <p className="text-gray-600">{row.getValue('name')}</p>
      ),
    },
    {
      accessorKey: 'year',
      header: ({ column }) => {
        return (
          <SortHeader
            isSomeSortSeted={!!column.getIsSorted()}
            resetFn={() => column.clearSorting()}
            OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            label={'themesTable.year'}
          />
        );
      },
      cell: ({ row }) => <p>{row.getValue('year')}</p>,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <SortHeader
            isSomeSortSeted={!!column.getIsSorted()}
            resetFn={() => column.clearSorting()}
            OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            label={'themesTable.price'}
          />
        );
      },
      cell: ({ row }) => <p>{row.getValue('price')}</p>,
    },
    {
      accessorKey: 'groups',
      header: 'themesTable.groups',
      cell: ( {row} ) => (
        <RedirectButton click={setGroupThemes.bind(null, row.original.id, orgId)} text="themesTable.groups" />
      ),
    },
    {
      accessorKey: 'options',
      header: 'themesTable.options',
      cell: ({ row }) => (
        <ButtonsAction
          endpoint={`themes/${row.original.id}?organizationId=${orgId}`} // endpot /
          invalidateKeyData={['themesData']}
          saveDefaultData={setRowData.bind(null, row.original)}
          rowId={row.original.id}
          subscription={false}
        />
      ),
    },
  ];
};
