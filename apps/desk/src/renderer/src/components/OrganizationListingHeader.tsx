import React from 'react'
import { Button } from './ui/button'
import { FiDownload, FiUpload } from 'react-icons/fi'

interface OrgListingHeaderProps {
    openImportModal: () => void
    openExportModal: () => void
}
const OrgListingHeader: React.FC<OrgListingHeaderProps> = ({ openImportModal, openExportModal }) => {
    return (
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
                Organizations
            </h1>
            <div className="flex gap-4">
                <Button
                    className="flex items-center custom-button gap-2 bg-blue-50 text-blue-600 px-6 py-2 rounded-lg"
                    onClick={openImportModal}
                >
                    <FiUpload className="h-5 w-5" />
                    Import
                </Button>
                <Button
                    className="flex items-center gap-2 custom-button bg-blue-600 text-white px-6 py-2 rounded-lg"
                    onClick={openExportModal}
                >
                    <FiDownload className="h-5 w-5" />
                    Export
                </Button>
            </div>
        </header>
    )
}

export default  OrgListingHeader