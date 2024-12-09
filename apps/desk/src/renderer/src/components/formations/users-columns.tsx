import { ColumnDef } from '@tanstack/react-table';
import SortHeader from '../costum-data/sort-header';
import DeleteModal from '../DeleteModal';
import ButtonsAction from '../organization/org-table-actions';
import { Checkbox } from '../ui/checkbox';
import RedirectButton from '../redirectButton';
import { Role, UserType } from '@renderer/store/slices/auth.slice';
import Paragraph from '../ui/Paragraph';

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
  userType: UserType,
  setRowData: (rowData: Users) => void
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
        <Paragraph paragraph={row.original.firstName} />
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
        <Paragraph paragraph={row.original.lastName} />
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
      cell: ({ row }) => <Paragraph paragraph={row.original.email} />,
    },
    {
      accessorKey: 'phone',
      header: 'themesTable.phone',
      cell: ({ row }) => <Paragraph paragraph={row.original.phone} />,
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
      cell: ({ row }) => <Paragraph paragraph={row.original.role} />,
    },
    {
      accessorKey: 'options',
      header: 'themesTable.options',
      cell: ({ row }) => (
        <ButtonsAction
          endpoint={
            userType === 'SOLUTION_OWNER'
              ? `user/${row.original.id}`
              : `/organizations/${row.original.organizationId}/users/${row.original.id}`
          }
          invalidateKeyData={
            userType === 'SOLUTION_OWNER'
              ? ['usersSygarData']
              : ['organizationUsers', row.original.organizationId]
          }
          saveDefaultData={setRowData.bind(null, row.original)}
          rowId={row.original.id}
          subscription={false}
        />
      ),
    },
  ];
};
