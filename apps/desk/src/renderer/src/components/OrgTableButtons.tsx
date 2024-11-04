import { Edit2 } from 'lucide-react'
import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { Button } from './ui/button'
import { cn } from './ui/lib/utils'
import { useTranslate } from '@renderer/hooks/useTranslate'
import DeleteModal from './DeleteModal'
import SubscriptionModal from './SubscriptionModal'

interface OrgTableButtonsProps {
  subscription: boolean
}

const OrgTableButtons: React.FC<OrgTableButtonsProps> = ({ subscription }): JSX.Element => {
  const { isRtl } = useTranslate()
  return (
    <div className="flex">
      <Button
        variant="ghost"
        size="icon"
        // onClick={openEditModal}
        className={cn(isRtl ? 'rounded-r-full' : 'rounded-l-full', 'bg-gray-300 text-blue-800')}
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      {subscription && <SubscriptionModal />}
      {/* Delete Button */}
      <DeleteModal />
    </div>
  )
}

export default OrgTableButtons
