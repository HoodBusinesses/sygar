import { Edit2 } from 'lucide-react';
import DeleteModal from '../DeleteModal';
import SubscriptionModal from '../SubscriptionModal';
import { Button } from '../ui/button';
// import { useNavigate } from '@tanstack/react-router';
import useDelete from '@renderer/hooks/api/organization/delete-org';

export default function ButtonsAction({
  rowId,
  subscription,
  endpoint,
  invalidateKeyData,
  saveDefaultData,
}: {
  rowId: string;
  subscription: boolean;
  endpoint: string;
  invalidateKeyData?: string;
  saveDefaultData: () => void;
}): JSX.Element {

  const mutation = useDelete({
    rowId,
    endpoint,
    invalidateKeyData,
  });

  return (
    <div className="flex justify-center">
      <Button
        variant="ghost"
        onClick={saveDefaultData}
        size="icon"
        className="bg-blue-800/10 text-blue-800 ltr:rounded-l-full rtl:rounded-r-full hover:bg-blue-400/50"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      {subscription && <SubscriptionModal />}
      <DeleteModal onDelete={() => mutation.mutate()} />
    </div>
  );
}