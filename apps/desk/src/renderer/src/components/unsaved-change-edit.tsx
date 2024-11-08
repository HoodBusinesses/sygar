import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

export default function UnsavedChangeEdit({
  open,
  ConfermFn,
  KeepEditFn
}: {
  open: boolean
  ConfermFn: () => void
  KeepEditFn: () => void
}) {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="p-4 bg-white items-center justify-center rounded-md shadow-md">
        <h2 className="text-xl text-gray-800  font-bold mb-4">Unsaved changes</h2>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus
        </p>
        <div className="flex justify-end">
          <Button
            onClick={KeepEditFn}
            className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2"
          >
            keep editing
          </Button>
          <DialogClose onClick={ConfermFn} className="custom-button bg-blue-500 hover:bg-blue-800">
            return back to listing
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
