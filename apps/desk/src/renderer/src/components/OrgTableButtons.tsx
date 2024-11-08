import { Edit2, Trash2 } from 'lucide-react';
import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { Button } from './ui/button';
import { cn } from './ui/lib/utils';
import { useTranslate } from '@renderer/hooks/useTranslate';

interface OrgTableButtonsProps {
  openEditModal: () => void;
  openSubscriptionModal: () => void;
  openDeleteModal: () => void;
}

const OrgTableButtons: React.FC<OrgTableButtonsProps> = ({
  openDeleteModal,
  openEditModal,
  openSubscriptionModal,
}): JSX.Element => {
  const { isRtl } = useTranslate();
  return (
    <div className="flex">
      <Button
        variant="ghost"
        size="icon"
        onClick={openEditModal}
        className={cn(
          isRtl ? 'rounded-r-full' : 'rounded-l-full',
          'bg-gray-300 text-blue-800'
        )}
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={openSubscriptionModal}
        className="bg-gray-300 text-gray-800 border border-none"
      >
        <FiCalendar className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={openDeleteModal}
        className={cn(
          isRtl ? 'rounded-l-full' : 'rounded-r-full',
          'bg-gray-300 text-red-800 '
        )}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default OrgTableButtons;
