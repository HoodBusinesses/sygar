import { Edit2 } from 'lucide-react'
import DeleteModal from '../DeleteModal'
import SubscriptionModal from '../SubscriptionModal'
import { Button } from '../ui/button'

export default function ButtonsAction({
  rowId,
  subscription,
  setEditOrg
}: {
  rowId: number
  subscription: boolean
  setEditOrg: () => void
}) {
  return (
    <div className="inline-flex items-center bg-gray-200 rounded-2xl gap-2 w-auto">
      <Button
        onClick={setEditOrg}
        variant="ghost"
        size="icon"
        className="flex items-center justify-center text-blue-800 hover:text-blue-700 hover:scale-105 transition-transform w-8 h-8 rounded-full"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      {subscription && <SubscriptionModal />}
      <DeleteModal onDelete={() => console.log(rowId)} />
    </div>
  )
}
