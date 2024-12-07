import { buttonVariants } from './ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { cn } from './ui/lib/utils';
import { useTranslate } from '@renderer/hooks/useTranslate';
// import { FiUpload } from 'react-icons/fi';
import Upload from '@renderer/assets/images/Export.png';

const ExportModal = (): JSX.Element => {
  const { t } = useTranslate();

  const handleExport = () => {
    console.log('Export');
  };

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants(),
          'flex items-center gap-2 custom-button bg-blue-600 text-white px-6 py-2 rounded-lg'
        )}
      >
        {/* <FiUpload className="h-5 w-5" /> */}
        <img src={Upload} alt="Upload" width={20} height={20} />
        {t('buttons.export')}
      </DialogTrigger>

      <DialogContent className="p-4 bg-white  rounded-md shadow-md">
        <DialogHeader className=''>

          <DialogTitle className='text-xl'>{t('modals.export.title')}</DialogTitle>
          <DialogDescription className='text-gray-500'>{t('modals.export.message')}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end ">
          <DialogClose className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 text-sm mr-2">
            Cancel
          </DialogClose>
          <DialogClose
            onClick={handleExport}
            className="custom-button text-sm bg-blue-600 hover:bg-blue-800"
          >
            Export
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
