import React from 'react'
import { Table, TableBody, TableCell, TableRow } from './ui/table'
import Profile_Img from '../assets/images/profile_img.png'
import OrgTableHeader from './OrgTableHeader'
import EnableButton from './ui/EnableButton'
import OrgTableButtons from './OrgTableButtons'

interface Organization {
  id: string
  rs: string
  cnss: string
  address: string
  email: string
  responsibleName: string
  trainingManagerName: string
  enabled: boolean
}

interface OrganizationTableProps {
  paginatedData: Organization[]
  openEditModal: () => void
  openSubscriptionModal: () => void
  openDeleteModal: () => void
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({
  paginatedData,
  openEditModal,
  openSubscriptionModal,
  openDeleteModal
}) => {
  // const { t, isRtl } = useTranslate()
  return (
    <div className="border rounded-lg overflow-hidden overflow-x-auto">
      <Table>
        {/**Table Header */}
        <OrgTableHeader />

        {/**Table Body */}
        <TableBody>
          {paginatedData.map((org) => (
            <TableRow key={org.id} className="hover:bg-gray-50">
              <TableCell>
                <img src={Profile_Img} alt="Organization" className="w-8 h-8 rounded-full" />
              </TableCell>
              <TableCell className="text-gray-600">{org.rs}</TableCell>
              <TableCell className="text-gray-600">{org.cnss}</TableCell>
              <TableCell className="text-gray-600">{org.address}</TableCell>
              <TableCell className="text-gray-600">{org.email}</TableCell>
              <TableCell className="text-gray-600">{org.responsibleName}</TableCell>
              <TableCell className="text-gray-600">{org.trainingManagerName}</TableCell>
              <TableCell>
                <EnableButton onClick={() => {}} disabled={org.enabled} />
              </TableCell>

              <TableCell>
                <OrgTableButtons
                  openDeleteModal={openDeleteModal}
                  openEditModal={openEditModal}
                  openSubscriptionModal={openSubscriptionModal}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrganizationTable
