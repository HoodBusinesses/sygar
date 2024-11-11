import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import ButtonsAction from '../organization/org-table-actions';
import DeleteModal from '../DeleteModal';
import SortHeader from '../costum-data/sort-header';
import { Button } from '../ui/button';
import { useTranslate } from '@renderer/hooks/useTranslate';

export interface Theme {
  id: number;
  name: string;
  identifier: string;
  year: string;
  price: number;
  groups?: string;
  options?: string;
}


export const themeColumns = (
  setGroupThemes: () => void
): ColumnDef<Theme>[] => {
  const { t } = useTranslate();

  return [
    {
      accessorKey: 'id',
      header: ({ table }) => (
        <div className="flex items-center gap-2">
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
            label={t('themesTable.name')}
          />
        );
      },
      cell: ({ row }) => <p className="text-gray-600">{row.getValue('name')}</p>,
    },
    {
      accessorKey: 'year',
      header: ({ column }) => {
        return (
          <SortHeader
            isSomeSortSeted={!!column.getIsSorted()}
            resetFn={() => column.clearSorting()}
            OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            label={t('themesTable.year')}
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
            label={t('themesTable.price')}
          />
        );
      },
      cell: ({ row }) => <p>{row.getValue('price')}</p>,
    },
    {
      accessorKey: 'groups',
      header: t('themesTable.groups'),
      cell: () => (
        <Button
          onClick={setGroupThemes}
          className="hover:underline text-blue-500 px-4 py-1"
        >
          {t('themesTable.groups')}
        </Button>
      ),
    },
    {
      accessorKey: 'options',
      header: t('themesTable.options'),
      cell: ({ row }) => (
        <ButtonsAction
          rowId={row.original.id}
          subscription={false}
          href={`/edit?type=themes&crud=edit`}
        />
      ),
    },
  ];
};
