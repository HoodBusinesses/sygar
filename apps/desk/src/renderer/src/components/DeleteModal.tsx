import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { Trash2 } from 'lucide-react'
import { cn } from './ui/lib/utils'

const DeleteModal = (): JSX.Element => {
  const { isRtl } = useTranslate()

  const handleDelete = (): void => {
    console.log('delete')
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          isRtl ? 'rounded-l-full' : 'h-10 px-4 py-2 rounded-r-full',
          'bg-gray-300 text-red-800 '
        )}
      >
        {' '}
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="bg-white p-4 items-center justify-center rounded-md shadow-md w-1/2">
        <DialogHeader>
          <DialogTitle>Delete organization?</DialogTitle>
          <DialogDescription>
            Organization will be lost. Are you sure you want to delete this organization?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleDelete} className="custom-button bg-red-500 hover:bg-red-800">
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
