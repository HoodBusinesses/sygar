import { ColumnDef } from '@tanstack/react-table';
import SortHeader from '../costum-data/sort-header';
import DeleteModal from '../DeleteModal';
import ButtonsAction from '../organization/org-table-actions';
import { Checkbox } from '../ui/checkbox';

import CostumSelect from '../costum-select';
import RedirectButton from '../redirectButton';
import { Role } from '@renderer/store/slices/auth.slice';

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: Role;
  identityType: string;
  identity: string;
  organizationId: string;
  userCnss: string;
}

export const usersColumns = (
  setRowData: (rowData: Users) => void,
): ColumnDef<Users>[] => {
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
          <p className="text-gray-600">{row.index + 1}</p>
        </div>
      ),
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <SortHeader
            isSomeSortSeted={!!column.getIsSorted()}
            resetFn={() => column.clearSorting()}
            OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            label={'themesTable.firstName'}
          />
        );
      },
      cell: ({ row }) => (
        <p className="text-gray-600">{row.original.firstName}</p>
      ),
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => {
        return (
          <SortHeader
            isSomeSortSeted={!!column.getIsSorted()}
            resetFn={() => column.clearSorting()}
            OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            label={'themesTable.lastName'}
          />
        );
      },
      cell: ({ row }) => (
        <p className="text-gray-600">{row.original.lastName}</p>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <SortHeader
            isSomeSortSeted={!!column.getIsSorted()}
            resetFn={() => column.clearSorting()}
            OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            label={'themesTable.email'}
          />
        );
      },
      cell: ({ row }) => <p className="text-gray-600">{row.original.email}</p>,
    },
    {
      accessorKey: 'phone',
      header: 'themesTable.phone',
      cell: ({ row }) => <p className="text-gray-600">{row.original.phone}</p>,
    },
    {
      accessorKey: 'permissions',
      header: 'themesTable.permission',
      cell: () => (
        <RedirectButton
          click={() => {
            console.log('view permissions');
          }}
          text="themesTable.permission"
        />
      ),
    },
    {
      accessorKey: 'role',
      header: 'themesTable.role',
      cell: ({ row }) => <CostumSelect value={row.original.role} />,
    },
    {
      accessorKey: 'options',
      header: 'themesTable.options',
      cell: ({ row }) => (
        <ButtonsAction
          endpoint={`/organizations/${row.original.organizationId}/users/${row.original.id}`} // endpot /
          invalidateKeyData={['organizationUsers', row.original.organizationId]}
          saveDefaultData={setRowData.bind(null, row.original)}
          rowId={row.original.id}
          subscription={false}
        />
      ),
    },
  ];
};
