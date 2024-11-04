import { ColumnDef } from '@tanstack/react-table'
import Profile_Img from '../../assets/images/profile_img.png'
import EnableButton from '../ui/EnableButton'
import ButtonsAction from './org-table-actions'

export type Organization = {
  id: number
  image: string
  rs: string
  cnss: string
  address: string
  email: string
  responsibleName: string
  trainingManagerName: string
  date: string
}

export const getColumns = (setEditOrg: () => void): ColumnDef<Organization>[] => [
  {
    accessorKey: 'image',
    header: 'organization.image',
    cell: ({ row }) => (
      <img
        src={Profile_Img || row.getValue('image')}
        alt="Organization"
        className="w-8 h-8 rounded-full"
      />
    )
  },
  {
    accessorKey: 'rs',
    header: 'organization.rs',
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('rs')}</p>
  },
  {
    accessorKey: 'cnss',
    header: 'organization.cnss',
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('cnss')}</p>
  },
  {
    accessorKey: 'address',
    header: 'organization.address',
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('address')}</p>
  },
  {
    accessorKey: 'email',
    header: 'organization.email',
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('email')}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'responsibleName',
    header: 'organization.responsibleName',
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('responsibleName')}</p>
  },
  {
    accessorKey: 'trainingManagerName',
    header: 'organization.trainingManagerName',
    cell: ({ row }) => <p className="text-gray-600">{row.getValue('trainingManagerName')}</p>
  },
  {
    accessorKey: 'enabled',
    header: 'organization.enabled',
    cell: ({ row }) => <EnableButton onClick={() => {}} value={row.getValue('enabled')} />,
    enableSorting: true
  },
  {
    accessorKey: 'actions',
    header: 'organization.actions',
    cell: ({ row }) => <ButtonsAction rowId={row.original.id} setEditOrg={setEditOrg} />
  }
]
