import { ColumnDef } from '@tanstack/react-table';
import Profile_Img from '../../assets/images/profile_img.png';
import SortHeader from '../costum-data/sort-header';
import EnableButton from '../ui/EnableButton';
import ButtonsAction from './org-table-actions';
import { Checkbox } from '../ui/checkbox';
import DeleteModal from '../DeleteModal';
import RedirectButton from '../redirectButton';


export type Organization = {
  id: string;
  logo: string;
  rs: string;
  cnss: string;
  address: string;
  ice: string;
  enabled: boolean;
  // email: string;
  // responsibleName: string;
  // trainingManagerName: string;
  // date: string;
};

export const Columns = (
  viewUsers: (orgId: string) => void,
  setRowData: (rowData: Organization) => void
  ): ColumnDef<Organization>[] => {
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
        </div>
      ),
    },
    {
      accessorKey: 'logo',
      header: 'organization.image',
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            src={Profile_Img || row.getValue('logo')}
            alt="Organization"
            className="w-8 h-8 rounded-full"
          />
        </div>
      ),
    },
    {
      accessorKey: 'rs',
      header: 'organization.rs',
      cell: ({ row }) => <p className="text-gray-600">{row.getValue('rs')}</p>,
    },
    {
      accessorKey: 'address',
      header: 'organization.address',
      cell: ({ row }) => (
        <p className="text-gray-600">{row.getValue('address')}</p>
      ),
    },
    {
      accessorKey: 'cnss',
      header: 'organization.cnss',
      cell: ({ row }) => (
        <p className="text-gray-600">{row.getValue('cnss')}</p>
      ),
    },
    {
      accessorKey: 'ice',
      header: 'ice',
      cell: ({ row }) => <p className="text-gray-600">{row.getValue('ice')}</p>,
    },
    {
      accessorKey: 'viewUsers',
      header: 'organization.viewUsers',
      cell: ({ row }) => (
        <RedirectButton click={viewUsers.bind(null, row.original.id)} text="organization.viewUsers" />
      ),
    },

    {
      accessorKey: 'enabled',
      header: ({ column }) => {
        return (
          <SortHeader
            isSomeSortSeted={!!column.getIsSorted()}
            resetFn={() => column.clearSorting()}
            OnClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            label="organization.enabled"
          />
        );
      },
      cell: ({ row }) => (
        <EnableButton onClick={() => {}} value={row.getValue('enabled')} />
      ),
    },
    {
      accessorKey: 'actions',
      header: 'organization.actions',
      cell: ({ row }) => (
        <ButtonsAction
          subscription={true}
          saveDefaultData={setRowData.bind(null, row.original)}
          rowId={row.original.cnss}
          endpoint={`/organizations/${row.original.id}`}
          invalidateKeyData={["organizationsData"]}
        />
      ),
      enableSorting: false,
      enableGlobalFilter: false,
    },
  ];
}