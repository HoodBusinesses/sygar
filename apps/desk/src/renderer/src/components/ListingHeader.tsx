import { useTranslate } from '@renderer/hooks/useTranslate'
import ExportModal from './ExportModal'
import ImportModal from './ImportModal'
import { Button } from './ui/button'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from '@tanstack/react-router'
import SearchTableInput from './costum-data/search-table-Input'
import { ChangeEventHandler } from 'react'

interface ListingHeaderProps {
  headTitle: string
  onSearchChange: ChangeEventHandler<HTMLInputElement>
}

const ListingHeader = ({ headTitle, onSearchChange }: ListingHeaderProps): JSX.Element => {
  const { t } = useTranslate()
  const navigate = useNavigate()
  const type =
    headTitle === 'formation.formation'
      ? 'themes'
      : headTitle === 'group.group'
        ? 'group'
        : 'participant'
  const href = `/edit?type=${type}&crud=add`

  return (
    <div className="flex flex-col gap-6 w-full">
      <p className='text-2xl font-semibold text-gray-800'>{t('formation.tables')}    <span className='text-sm rounded-sm bg-blue-100  text-blue-600'>{t(headTitle)}</span></p>
      <div className="flex items-center justify-between w-full">
        <SearchTableInput onChange={onSearchChange} />
        <div className="flex gap-4">
          {!(headTitle === 'organization.organizations') && (
            <Button
              onClick={() => navigate({ to: href })}
              className="flex items-center custom-button gap-2 bg-blue-600 text-blue-50 px-6 py-2 rounded-lg"
            >
              <FiPlus className="h-5 w-5" />
              {t('buttons.add')}
            </Button>
          )}
          <ImportModal />
          <ExportModal />
        </div>
      </div>
    </div>
  );
};

export default ListingHeader
