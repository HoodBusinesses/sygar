import { FC } from 'react'
import { Button } from './ui/button'
import { DialogClose } from './ui/dialog'

interface DeleteModalProps {
  onDelete: () => void
}

const DeleteModal: FC<DeleteModalProps> = ({ onDelete }: DeleteModalProps) => {
  return (
    <div className="bg-white p-4 items-center justify-center rounded-md shadow-md">
      <div className="p-4">
        <h2 className="text-xl text-gray-800  font-bold mb-4">DELETE Post</h2>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus
        </p>
      </div>
      <div className="flex justify-end">
        <DialogClose className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
          Cancel
        </DialogClose>
        <Button onClick={onDelete} className="custom-button bg-red-500 hover:bg-red-800">
          Delete
        </Button>
      </div>
    </div>
  )
}

export default DeleteModal
