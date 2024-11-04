import { FiDownload } from 'react-icons/fi'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { useTranslate } from '@renderer/hooks/useTranslate'

const ExportModal = (): JSX.Element => {
  const { t } = useTranslate()
  const handleExport = (): void => {
    console.log('Export')
  }

  return (
    <Dialog>
      <DialogTrigger
        className={
          'flex items-center custom-button gap-2 bg-blue-600 text-blue-50 px-6 py-2 rounded-lg'
        }
      >
        {' '}
        <FiDownload className="h-5 w-5" />
        {t('buttons.export')}
      </DialogTrigger>
      <DialogContent className="bg-white p-4 items-center justify-center rounded-md shadow-md w-1/2">
        <DialogHeader>
          <DialogTitle>Export Organizations</DialogTitle>
          <DialogDescription>Do you want to export organizations?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleExport} className="custom-button bg-blue-500 hover:bg-blue-800">
              Export
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExportModal
