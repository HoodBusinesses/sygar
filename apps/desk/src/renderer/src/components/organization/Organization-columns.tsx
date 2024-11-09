import { ColumnDef } from '@tanstack/react-table';
import Profile_Img from '../../assets/images/profile_img.png';
import SortHeader from '../costum-data/sort-header';
import EnableButton from '../ui/EnableButton';
import ButtonsAction from './org-table-actions';
import { Checkbox } from '../ui/checkbox';
import DeleteModal from '../DeleteModal';

export type Organization = {
  id: number;
  image: string;
  rs: string;
  cnss: string;
  address: string;
  email: string;
  responsibleName: string;
  trainingManagerName: string;
  date: string;
};

export const Columns: ColumnDef<Organization>[] = [
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
    accessorKey: 'image',
    header: 'organization.image',
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <img
          src={Profile_Img || row.getValue('image')}
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
    accessorKey: 'cnss',
    header: 'organization.cnss',
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('cnss')}</p>,
  },
  {
    accessorKey: 'address',
    header: 'organization.address',
    cell: ({ row }) => (
      <p className="text-gray-600">{row.getValue('address')}</p>
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
          label="organization.email"
        />
      );
    },
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('email')}</p>,
  },
  {
    accessorKey: 'responsibleName',
    header: 'organization.responsibleName',
    cell: ({ row }) => (
      <p className="text-gray-600">{row.getValue('responsibleName')}</p>
    ),
  },
  {
    accessorKey: 'trainingManagerName',
    header: 'organization.trainingManagerName',
    cell: ({ row }) => (
      <p className="text-gray-600">{row.getValue('trainingManagerName')}</p>
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
      <ButtonsAction subscription={true} rowId={row.original.id} href="" />
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  },
];
