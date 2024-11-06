import { FC } from 'react'
import { Button, buttonVariants } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import { cn } from './ui/lib/utils'
import { Trash2 } from 'lucide-react'

interface DeleteModalProps {
  onDelete: () => void
  ConfirmDeleteAll?: number
}

const DeleteModal: FC<DeleteModalProps> = ({ onDelete, ConfirmDeleteAll }: DeleteModalProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          ConfirmDeleteAll
            ? 'rounded-full bg-transparent'
            : 'ltr:rounded-r-full rtl:rounded-l-full bg-gray-300',
          'text-red-800'
        )}
      >
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent>
        <div className="bg-white p-4 items-center justify-center rounded-md shadow-md">
          <div className="p-4">
            <h2 className="text-xl text-gray-800  font-bold mb-4">
              {ConfirmDeleteAll ? `Delete ${ConfirmDeleteAll} Items` : 'Delete item'}
            </h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus
            </p>
          </div>
          <div className="flex justify-end">
            <DialogClose className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
              Cancel
            </DialogClose>
            <Button onClick={onDelete} className="custom-button bg-red-500 hover:bg-red-800">
              {'Delete'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
