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
    <div className="inline-flex items-center bg-gray-200 rounded-2xl gap-2 w-auto">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: href })}
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
