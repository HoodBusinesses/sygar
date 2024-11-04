import { Edit2, Trash2 } from 'lucide-react'
import { FiCalendar } from 'react-icons/fi'
import DeleteModal from '../DeleteModal'
import RegistrationInfo from '../RegistrationInfo'
import SubscriptionModal from '../SubscriptionModal'
import { Button, buttonVariants } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { cn } from '../ui/lib/utils'

export default function ButtonsAction({
  rowId,
  setEditOrg
}: {
  rowId: number
  setEditOrg: () => void
}) {
  return (
    <div className="flex">
      <Button
        onClick={setEditOrg}
        variant="ghost"
        size="icon"
        className="bg-gray-300 text-blue-800 ltr:rounded-l-full rtl:rounded-r-full"
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      <Dialog>
        <DialogTrigger
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'bg-gray-300 text-gray-800 border border-none'
          )}
        >
          <FiCalendar className="h-4 w-4" />
        </DialogTrigger>

        <DialogContent>
          <SubscriptionModal />
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'bg-gray-300 text-red-800 ltr:rounded-r-full rtl:rounded-l-full'
          )}
        >
          <Trash2 className="h-4 w-4" />
        </DialogTrigger>

        <DialogContent>
          <DeleteModal onDelete={() => console.log(rowId)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
