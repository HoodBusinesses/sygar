import { FC } from 'react'
import { buttonVariants } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from './ui/dialog'
import { cn } from './ui/lib/utils'
import Trash from '@renderer/assets/images/trash.png'
import { useTranslate } from '@renderer/hooks/useTranslate'

interface DeleteModalProps {
  onDelete: () => void
  DeleteNumber?: number
}

const DeleteModal: FC<DeleteModalProps> = ({ onDelete, DeleteNumber }: DeleteModalProps) => {
  const { t , isRtl } = useTranslate();

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          DeleteNumber
            ? 'rounded-full bg-transparent'
            : 'ltr:rounded-r-full rtl:rounded-l-full bg-red-50',
          'text-red-800 hover:bg-red-100 h-[31px] w-[52px]'
        )}
      >
        {/* <Trash2 className="h-4 w-4" /> */}
        <img src={Trash} alt="Delete" width={14} height={14} />
      </DialogTrigger>

      <DialogContent className="bg-white p-4 rounded-md shadow-md  ">
        <DialogHeader className=' '>
          <DialogTitle className='text-xl'>{t('modals.delete.title')}</DialogTitle>
          <DialogDescription className='text-gray-500'>
            {t('modals.delete.message')}
          </DialogDescription>
        </DialogHeader>
        <div className={cn("flex", 
            isRtl ? "justify-start" : "justify-end"
          )}>
          <DialogClose className="custom-button text-sm text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
            {t('buttons.cancel')}
          </DialogClose>
          <DialogClose
            onClick={onDelete}
            className="custom-button text-sm bg-[#FF0000] hover:bg-red-800"
          >
            {t('buttons.delete')}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal
