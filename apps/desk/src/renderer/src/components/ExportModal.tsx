import { DialogClose } from '@radix-ui/react-dialog'
import { FC } from 'react'
import { Button } from './ui/button'

interface DeleteModalProps {
}

const ExportModal: FC<DeleteModalProps> = () => {
  const handleExport = () => {
    console.log('Export')
  }

  return (
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
  )
}

export default ExportModal
