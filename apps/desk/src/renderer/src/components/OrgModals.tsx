import React from 'react'
import DeleteModal from './DeleteModal'
import ExportModal from './ExportModal'
import ImportModal from './ImportModal'
import SubscriptionModal from './SubscriptionModal'
import RegistrationInfo from './RegistrationInfo'
import { Button } from './ui/button'

interface ModalsProps {
  modals: {
    isDeleteModalOpen: boolean
    isExportModalOpen: boolean
    isImportModalOpen: boolean
    isSubscriptionModalOpen: boolean
    isGroupsModalOpen: boolean
    editModalOpen: boolean
  }
  handleCloseModals: () => void
}

const OrgModals: React.FC<ModalsProps> = ({ modals, handleCloseModals }) => {
  return (
    <>
      {modals.editModalOpen && (
        <>
          <div className="flex flex-row p-5">
            <Button
              className="custom-button bg-blue-600 hover:bg-blue-500"
              onClick={handleCloseModals}
            >
              Close
            </Button>
            <p className="text-xl text-gray-900 px-5">Back To Organizations</p>
          </div>
          <RegistrationInfo />
        </>
      )}
    </>
  )
}
export default OrgModals

