import React from 'react'
import { useTranslate } from '@renderer/hooks/useTranslate'
import ExportModal from './ExportModal'
import ImportModal from './ImportModal'

interface ListingHeaderProps {
  headTitle: string
}
const ListingHeader: React.FC<ListingHeaderProps> = ({ headTitle }) => {
  const { t } = useTranslate()
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">{t(headTitle)}</h1>
      <div className="flex gap-4">
        <ImportModal />
        <ExportModal />
      </div>
    </header>
  )
}

export default ListingHeader
