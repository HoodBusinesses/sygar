import { CustomTable } from "@renderer/components/custom-table";
import { participantColumns } from "@renderer/components/formations/participants-columns";
import withAuth from "@renderer/hoc/with-auth";
import { useGetAllParticpants } from "@renderer/hooks/api/prticipants/gat-all-participants";
import { useTranslate } from "@renderer/hooks/useTranslate";
import { mockParticipant } from "@renderer/utils/static/organizations";

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

  const participants = isSuccess && Array.isArray(data) ? data : [];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="h-full bg-white w-full p-6 space-y-6"
    >
      <div className="flex flex-col">
        <CustomTable
          headTitle="participant.participant"
          columns={participantColumns()}
          // data={mockParticipant}
          data={participants.map((parti) => ({
            id: Number(parti.uid),
            name: `${parti.firstName} ${parti.lastName}`,
            email: parti.email,
            cin: parti.organizationId,
            cnss: parti.cnss,
            status: parti.status,
          }))}
        />
      </div>
    </div>
  );
};

export default withAuth(ParticipantsListing);
