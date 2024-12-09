import { buttonVariants } from './ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { cn } from './ui/lib/utils';
import { useTranslate } from '@renderer/hooks/useTranslate';
// import { FiUpload } from 'react-icons/fi';
import Upload from '@renderer/assets/images/Export.png';

const ExportModal = (): JSX.Element => {
  const { t ,isRtl } = useTranslate();

  const handleExport = () => {
    console.log('Export');
  };
  
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants(),
          'flex flex-1 font-normal font-roboto items-center gap-4 custom-button bg-blue-600 text-white px-6 py-2 rounded-lg'
        )}
      >
        {/* <FiUpload className="h-5 w-5" /> */}
        <img src={Upload} alt="Upload" width={22} height={22} />
        {t('buttons.export')}
      </DialogTrigger>

      <DialogContent className={"p-4 bg-white rounded-md shadow-md"}>
        
        <DialogHeader className={cn('flex', isRtl ? "justify-start text-right" : "justify-end text-left")}>
          <DialogTitle className='text-xl'>{t('modals.export.title')}</DialogTitle>
          <DialogDescription className='text-gray-500'>{t('modals.export.message')}</DialogDescription>
        </DialogHeader>
        <div className={cn("flex", 
            isRtl ? "justify-start" : "justify-end"
          )}>
          <DialogClose className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 text-sm mr-2">
            {t('buttons.cancel')}
          </DialogClose>
          <DialogClose
            onClick={handleExport}
            className="custom-button text-sm bg-blue-600 hover:bg-blue-800"
          >
            {t('buttons.export')}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
