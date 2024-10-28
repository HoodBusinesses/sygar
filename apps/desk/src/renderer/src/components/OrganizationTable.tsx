import React from 'react'
import { Button } from './ui/button'
import { Edit2, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { FiCalendar } from 'react-icons/fi'
import { useTranslate } from '@renderer/hooks/useTranslate'
import Profile_Img from '../assets/images/profile_img.png'

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
  const { t } = useTranslate()
  return (
    <div className="border rounded-lg overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-gray-600">{t('organization.image')}</TableHead>
            <TableHead className="text-gray-600">{t('organization.rs')}</TableHead>
            <TableHead className="text-gray-600">{t('organization.cnss')}</TableHead>
            <TableHead className="text-gray-600">{t('organization.address')}</TableHead>
            <TableHead className="text-gray-600">{t('organization.email')}</TableHead>
            <TableHead className="text-gray-600">{t('organization.responsibleName')}</TableHead>
            <TableHead className="text-gray-600">{t('organization.trainingManagerName')}</TableHead>
            <TableHead className="text-gray-600">{t('organization.enabled')}</TableHead>
            <TableHead className="text-gray-600">{t('organization.actions')}</TableHead>
          </TableRow>
        </TableHeader>
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
                <div className="">
                  <input
                    className="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] 
                    bg-gray-200 before:absolute before:h-3.5 before:w-3.5 before:rounded-full
                    before:bg-purple-300 before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem]
                    after:h-5 after:w-5 after:rounded-full after:border-none after:bg-gray-500
                    after:transition-[background-color_0.2s,transform_0.2s]  after:content-['']
                    checked:bg-purple-300 checked:after:ml-[1.0625rem]  checked:after:bg-purple-600"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchChecked"
                    checked={org.enabled}
                    // onChange={handleCheckboxChange}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={openEditModal}
                    className="bg-gray-300 text-blue-800 rounded-l-full"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={openSubscriptionModal}
                    className="bg-gray-300 text-gray-800 border border-none"
                  >
                    <FiCalendar className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={openDeleteModal}
                    className="bg-gray-300 text-red-800 rounded-r-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrganizationTable
