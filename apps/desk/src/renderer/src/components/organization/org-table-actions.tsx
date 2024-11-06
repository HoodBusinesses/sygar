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
    <div className="flex">
      <Button
        onClick={setEditOrg}
        variant="ghost"
        size="icon"
        className="bg-gray-300 text-blue-800 ltr:rounded-l-full rtl:rounded-r-full"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      {subscription && <SubscriptionModal />}
      <DeleteModal onDelete={() => console.log(rowId)} />
    </div>
  )
}
