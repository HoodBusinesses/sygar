import { mockParticipant } from '@renderer/utils/static/organizations';
import { useTranslate } from '@renderer/hooks/useTranslate';
import withAuth from '@renderer/hoc/with-auth';
import { Components, CustomTable } from '@renderer/components/custom-table';
import { Participant, participantColumns } from '@renderer/components/formations/participants-columns';
import { useState } from 'react';
import EditParticipant from '@renderer/components/formations/edit-participant';

const ParticipantsListing: React.FC = () => {
  const { isRtl } = useTranslate();

  const [component, setComponent] = useState<Components>('table');

  const [defaultValue, setdefaultValue] = useState<Participant | null>(null);


  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="h-full bg-white w-full p-6 space-y-6"
    >
        <CustomTable
          component={component}
          EditAndAddRowComponent={
            <EditParticipant crud={component} defaultValues={defaultValue} goBack={() => setComponent('table')} />
          }
          setComponent={setComponent}
          headTitle="participant.participant"
          columns={participantColumns(
            (rowData: Participant) => {
              setdefaultValue(rowData);
              setComponent('edit');
            }
          )}
          data={mockParticipant}
        />
    </div>
  );
};

export default withAuth(ParticipantsListing);
