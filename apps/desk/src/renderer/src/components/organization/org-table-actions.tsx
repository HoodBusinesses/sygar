import { Edit2 } from 'lucide-react'
import DeleteModal from '../DeleteModal'
import SubscriptionModal from '../SubscriptionModal'
import { Button } from '../ui/button'
import { useNavigate } from '@tanstack/react-router'

export default function ButtonsAction({
  rowId,
  subscription,
  href
}: {
  rowId: number
  subscription: boolean
  href: string
}): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="flex">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: href })}
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
