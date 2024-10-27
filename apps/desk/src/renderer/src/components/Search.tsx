import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Input } from './ui/input';

interface SearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-1/3">
      <Input
        placeholder="Search for organization by email or cnss"
        className="pl-10 pr-3 py-3 px-20 text-gray-600 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
};

export default Search;