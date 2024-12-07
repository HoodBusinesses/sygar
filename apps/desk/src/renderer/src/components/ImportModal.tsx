import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { buttonVariants } from './ui/button';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { cn } from './ui/lib/utils';
// import { FiUpload } from 'react-icons/fi'
// import { FiDownload } from 'react-icons/fi';
// import Upload from '@renderer/assets/images/uploadLogo.png'
import Download from '@renderer/assets/images/Import.png'
import FileUploader from './ui/fileUploader';

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
        {/* <FiDownload className="h-5 w-5" /> */}
        <img src={Download} alt='Upload' width={20} height={20} />
        {t('buttons.import')}
      </DialogTrigger>

      <DialogContent className='bg-white p-4 rounded-md shadow-md'>
        {/* <ImportModal /> */}
        <DialogHeader className="px-4">
          <DialogTitle className='text-xl'>{t('modals.import.titleDocument')}</DialogTitle>
          <DialogDescription className='text-gray-500'>
            {t('modals.import.messageDocument')}
          </DialogDescription>
        </DialogHeader>

          <FileUploader />
          <p  className='text-gray-500 px-4'>
              {t('buttons.onlyXls')}
            </p>
          <div className="flex justify-end">
            <DialogClose className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
              Cancel
            </DialogClose>
            <DialogClose
              onClick={handleEImport}
              className="custom-button bg-blue-600 hover:bg-blue-800"
            >
              Next
            </DialogClose>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportModal;
