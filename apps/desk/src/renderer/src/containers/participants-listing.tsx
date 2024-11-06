import { mockParticipant } from '@renderer/utils/static/organizations'
import { useTranslate } from '@renderer/hooks/useTranslate'
import withAuth from '@renderer/hoc/with-auth'
import ListingHeader from '@renderer/components/ListingHeader'
import { CustomTable } from '@renderer/components/custom-table'
import { participantColumns } from '@renderer/components/formations/participants-columns'

const ParticipantsListing: React.FC = () => {
  const { isRtl } = useTranslate()

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full bg-white w-full p-6 space-y-6">
      <ListingHeader headTitle="participants" />
      <div className="flex flex-col">
        <CustomTable columns={participantColumns()} data={mockParticipant} />
      </div>
    </div>
  )
}

export default withAuth(ParticipantsListing)
