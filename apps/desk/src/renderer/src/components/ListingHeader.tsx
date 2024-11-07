import { useTranslate } from '@renderer/hooks/useTranslate'
import ExportModal from './ExportModal'
import ImportModal from './ImportModal'
import { Button } from './ui/button'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from '@tanstack/react-router'

interface ListingHeaderProps {
  headTitle: string
}

const ListingHeader = ({ headTitle }: ListingHeaderProps): JSX.Element => {
  const { t } = useTranslate()
  const navigate = useNavigate()
  const type =
    headTitle === 'formation.formation'
      ? 'formation'
      : headTitle === 'group.groups'
        ? 'group'
        : 'participant'
  const href = `/edit?type=${type}&crud=add`
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">{t(headTitle)}</h1>
      <div className="flex gap-4">
        {!(headTitle === 'organization.organizations') && (
          <Button
            onClick={() => navigate({ to: href })}
            className="flex items-center custom-button gap-2 bg-blue-600 text-blue-50 px-6 py-2 rounded-lg"
          >
            <FiPlus />
            {'ADD'}
          </Button>
        )}
        <ImportModal />
        <ExportModal />
      </div>
    </div>
  )
}

export default ListingHeader
