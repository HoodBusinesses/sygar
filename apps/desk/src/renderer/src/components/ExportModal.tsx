import { Button, buttonVariants } from './ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogClose } from './ui/dialog'
import { cn } from './ui/lib/utils'
import { FiDownload } from 'react-icons/fi'
import { useTranslate } from '@renderer/hooks/useTranslate'

const ExportModal = (): JSX.Element => {
  const { t } = useTranslate()

  const handleExport = () => {
    console.log('Export')
  }

  return (
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
        <div className=" bg-white p-4 items-center justify-center rounded-md shadow-md">
          <div className="p-4">
            <h2 className="text-xl text-gray-800  font-bold mb-4">Export Organizations</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus
            </p>
          </div>
          <div className="flex justify-end">
            <DialogClose className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
              Cancel
            </DialogClose>
            <Button onClick={handleExport} className="custom-button bg-blue-500 hover:bg-blue-800">
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExportModal
