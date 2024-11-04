import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { FiUpload } from 'react-icons/fi'
import { Button } from './ui/button'
import { useTranslate } from '@renderer/hooks/useTranslate'


const ImportModal = (): JSX.Element => {
  const { t } = useTranslate()
  const handleEImport = (): void => {
    console.log('Import')
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center custom-button gap-2 bg-blue-50 text-blue-600 px-6 py-2 rounded-lg">
        <FiUpload className="h-5 w-5" />
        {t('buttons.import')}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-brightness-75" />
        <DialogContent className="bg-white p-4 items-center justify-center rounded-md shadow-md w-1/2">
          <DialogHeader>
            <DialogTitle>Document upload</DialogTitle>
            <DialogDescription>
              Add your documents here, and you can upload up to 5 files max
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V8m0 0l4-4m-4 4l-4-4m13 8h-6m6 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h6m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload </span>Or Drag your file(s) to
                  start uploading
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Only .xml Files</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleEImport} className="custom-button bg-blue-500 hover:bg-blue-800">
              Import
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default ImportModal
