import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';

export default function UnsavedChangeEdit({
  open,
  ConfermFn,
  KeepEditFn,
}: {
  open: boolean;
  ConfermFn: () => void;
  KeepEditFn: () => void;
}) {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="p-4 bg-white items-center justify-center rounded-md shadow-md">
        <DialogTitle className="text-xl text-gray-800  font-bold">
          Discard Unsaved Changes?
        </DialogTitle>

        <DialogDescription className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus
        </DialogDescription>

        <div className="flex justify-end">
          <DialogClose
            onClick={KeepEditFn}
            className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2"
          >
            Keep Editing
          </DialogClose>
          <DialogClose onClick={ConfermFn} className="custom-button bg-red-500">
            Discard
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
