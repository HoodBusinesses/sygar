// import { Edit2, Image } from 'lucide-react';
import DeleteModal from '../DeleteModal';
import SubscriptionModal from '../SubscriptionModal';
import { Button } from '../ui/button';
import useDelete from '@renderer/hooks/api/organization/delete-org';
import { QueryKey } from '@tanstack/react-query';
import Edit from '@renderer/assets/images/edit-2.png';

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
  invalidateKeyData?: QueryKey;
  saveDefaultData: () => void;
}): JSX.Element {
  const mutation = useDelete({
    rowId,
    endpoint,
    invalidateKeyData,
  });

  return (
    <div className="flex justify-center ">
      <Button
        variant="ghost"
        onClick={saveDefaultData}
        size="icon"
        className="bg-blue-50 text-blue-800 h-[31px] w-[52px]   ltr:rounded-l-full rtl:rounded-r-full hover:bg-blue-100"
      >
        {/* <Edit2 className="h-[14px] w-[14px]" /> */}
        <img src={Edit} alt="Edit" width={14} height={14}  />
      </Button>
      {subscription && <SubscriptionModal />}
      <DeleteModal onDelete={() => mutation.mutate()} />
    </div>
  );
}