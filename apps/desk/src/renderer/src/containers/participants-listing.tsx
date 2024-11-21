import { CustomTable } from '@renderer/components/custom-table';
import { participantColumns } from '@renderer/components/formations/participants-columns';
import withAuth from '@renderer/hoc/with-auth';
import { useGetAllParticpants } from '@renderer/hooks/api/prticipants/gat-all-participants';
import { useTranslate } from '@renderer/hooks/useTranslate';

const ParticipantsListing: React.FC = () => {
  const { isRtl } = useTranslate();
  const { data, isSuccess, isLoading, isError } = useGetAllParticpants();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">Error loading organization data</div>
    );
  }

  if (isSuccess) console.log("data particapants: ", data)

  const participants = isSuccess ? data : [];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="h-full bg-white w-full p-6 space-y-6"
    >
      <div className="flex flex-col">
        <CustomTable
          headTitle="participant.participant"
          columns={participantColumns()}
          data={participants.map((participant) => ({
            id: Number(participant.uid),
            name: `${participant.firstName} ${participant.lastName}`,
            email: participant.email,
            cin: participant.organizationId,
            cnss: participant.cnss,
            status: participant.status,
          }))}
        />
      </div>
    </div>
  );
};

export default withAuth(ParticipantsListing);
