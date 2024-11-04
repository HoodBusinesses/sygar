import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { useTranslate } from '@renderer/hooks/useTranslate'
import ExportModal from '../ExportModal'
import ImportModal from '../ImportModal'
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
import { cn } from '../ui/lib/utils'

interface OrgListingHeaderProps {
}
const OrgListingHeader: React.FC<OrgListingHeaderProps> = () => {
  const { t } = useTranslate()
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">{t('organization.organizations')}</h1>
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger
            className={cn(
              buttonVariants(),
              'flex items-center custom-button gap-2 bg-blue-50 text-blue-600 px-6 py-2 rounded-lg'
            )}
          >
            <FiUpload className="h-5 w-5" />
            {t('buttons.import')}
          </DialogTrigger>

          <DialogContent>
            <ImportModal />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger
            className={cn(
              buttonVariants(),
              'flex items-center gap-2 custom-button bg-blue-600 text-white px-6 py-2 rounded-lg'
            )}
          >
            <FiDownload className="h-5 w-5" />
            {t('buttons.export')}
          </DialogTrigger>

          <DialogContent>
            <ExportModal />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default OrgListingHeader
