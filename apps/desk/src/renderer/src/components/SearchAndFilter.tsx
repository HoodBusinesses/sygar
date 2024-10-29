import React from 'react'

interface SearchAndFilterProps {
  onSearch: (search: string) => void
  onFilter: (filter: string) => void
}

import React from 'react'
import { Input } from './ui/input'
import { FiSearch } from 'react-icons/fi'
import SortByPopover from './SortBy'
import { Filter } from 'lucide-react'

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onFilter, onSearch }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Left Section: Search Input */}
      <div className="relative w-1/3">
        <Input
          placeholder="Search for organization by email or cnss"
          className="pl-10 pr-3 py-3 px-20 text-gray-600  border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      {/* Right Section: Buttons and Profile */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Buttons Section with Two Rows */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {' '}
            {/* Increased horizontal gap */}
            <SortByPopover onSort={(sortConfig) => setSortConfig(sortConfig)} />
            <Filter OnFilter={(filters) => console.log(filters)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter
