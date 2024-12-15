import { Components, CustomTable } from '@renderer/components/custom-table';
import EditParticipant from '@renderer/components/formations/edit-participant';
import {
  Participant,
  participantColumns,
} from '@renderer/components/formations/participants-columns';
import { ParticipantsData } from '@renderer/hooks/api/participant/get-all-participants';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { Dispatch, SetStateAction, useState } from 'react';

export default function ParticipantsTable({
  data,
  orgId,
  groupId,
  setSearch,
  isReFetching,
  search,
}: {
  data: ParticipantsData[];
  orgId: string;
  groupId: string;
  isReFetching: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}) {
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
        setSearch={setSearch}
        search={search}
        isReFetching={isReFetching}
        EditAndAddRowComponent={
          <EditParticipant
            orgId={orgId}
            groupId={groupId}
            crud={component}
            defaultValues={defaultValue}
            goBack={() => setComponent('table')}
          />
        }
        setComponent={setComponent}
        headTitle="participant.participant"
        columns={participantColumns(orgId, groupId, (rowData: Participant) => {
          setdefaultValue(rowData);
          setComponent('edit');
        })}
        data={data.map((participant) => ({
          id: participant.id,
          name: participant.firstName + ' ' + participant.lastName,
          email: participant.email,
          cin: participant.identity,
          cnss: participant.cnss,
          status: participant.status,
        }))}
      />
    </div>
  );
}
