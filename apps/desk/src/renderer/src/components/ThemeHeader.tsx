import React from 'react'
import Filter from './Filter'
import Search from './Search'
import { Button } from './ui/button'
import { FiFilter, FiPlus } from 'react-icons/fi'
import { useTranslate } from '@renderer/hooks/useTranslate'
interface ThemeHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  placeholder: string
}
const ThemeHeader: React.FC<ThemeHeaderProps> = ({
  searchQuery,
  placeholder,
  setSearchQuery
}): JSX.Element => {
  const { t } = useTranslate()
  return (
    <div className="flex flex-row justify-between mb-6 gap-4">
      <div className="flex flex-row">
        {/* <Filter /> */}
        <Button >
        <FiFilter />
        </Button>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={t(placeholder)}
        />
      </div>
      <Button onClick={() => console.log('clicked')} className="bg-blue-500 text-white">
        <FiPlus />
        {t('buttons.add')}
      </Button>
    </div>
  )
}

export default ThemeHeader
