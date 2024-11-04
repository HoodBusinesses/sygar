import React from 'react'
import Search from './Search'
import SortByPopover from './SortBy'
import Filter from './Filter'
import { sortConfig } from '@renderer/utils/filter/filter'

interface SearchAndFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  setSortConfig: (sortConfig: sortConfig) => void
  setFilter: (filters: any) => void
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  setSortConfig,
  setFilter
}) => {
  return (
    <div className="flex justify-between items-center mb-6 gap-4">
      {/* Left Section: Search Input */}
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={'......'} />

      {/* Right Section: Buttons and Profile */}
      <div className="flex gap-4">
        <SortByPopover onSort={(sortConfig) => setSortConfig(sortConfig)} />
        <Filter OnFilter={(filters) => setFilter(filters)} />
      </div>
    </div>
  )
}

export default SearchAndFilters
