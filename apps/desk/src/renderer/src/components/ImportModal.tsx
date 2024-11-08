import { Dialog, DialogTrigger, DialogContent, DialogClose } from './ui/dialog';
import { buttonVariants } from './ui/button';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { cn } from './ui/lib/utils';
// import { FiUpload } from 'react-icons/fi'
import { FiDownload } from 'react-icons/fi';

const ImportModal = (): JSX.Element => {
  const { t } = useTranslate();

  const handleEImport = (): void => {
    console.log('Import');
  };

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants(),
          'flex items-center custom-button gap-2 bg-blue-50 text-blue-600 px-6 py-2 rounded-lg'
        )}
      >
        <FiDownload className="h-5 w-5" />
        {t('buttons.import')}
      </DialogTrigger>

      <DialogContent>
        {/* <ImportModal /> */}
        <div className=" bg-white p-4 rounded-md shadow-md">
          <div className="p-4">
            <h2 className="text-xl text-gray-800  font-bold mb-4">
              Document upload
            </h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              natus
            </p>
          </div>
          <div className="flex items-center justify-center p-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <p className="text-gray-400 ">Only .xml Files</p>
          <div className="flex justify-end">
            <DialogClose className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
              Cancel
            </DialogClose>
            <DialogClose
              onClick={handleEImport}
              className="custom-button bg-blue-500 hover:bg-blue-800"
            >
              Next
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportModal;
