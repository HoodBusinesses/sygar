import { useTranslate } from '@renderer/hooks/useTranslate';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { cn } from './ui/lib/utils';
import { Dispatch, SetStateAction } from 'react';

export default function UnsavedChangeEdit({
  open,
  ConfermFn,
  KeepEditFn,
  onOpenChange,
}: {
  open: boolean;
  ConfermFn: () => void;
  KeepEditFn: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const { t, isRtl } = useTranslate();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent
        dir={isRtl ? 'rtl' : 'ltr'}
        className="p-4 bg-white items-center justify-center rounded-md shadow-md"
      >
        <DialogTitle className="text-xl text-gray-800  font-bold">
          {t('modals.unsavedChanges.title')}
        </DialogTitle>

        <DialogDescription
          className={cn(isRtl && 'self-start', 'text-gray-500')}
        >
          {t('modals.unsavedChanges.message')}
        </DialogDescription>

        <div className={cn('flex gap-2 justify-end')}>
          <DialogClose
            onClick={KeepEditFn}
            className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2"
          >
            {t('buttons.keepEditing')}
          </DialogClose>
          <DialogClose onClick={ConfermFn} className="custom-button bg-red-500">
            {t('buttons.discard')}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
