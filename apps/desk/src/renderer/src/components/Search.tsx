import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Input } from './ui/input';
import { useTranslate } from '@renderer/hooks/useTranslate';
interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
}

const Search: React.FC<SearchProps> = ({
  searchQuery,
  placeholder,
  setSearchQuery,
}) => {
  const { t, isRtl } = useTranslate();

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="relative ml-4">
      <Input
        placeholder={placeholder}
        className="pl-10 pr-3 py-3 px-20 text-gray-600 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none w-full"
        value={searchQuery}
        onChange={(e) => {
          console.log('e.target.value: ', e.target.value);
          setSearchQuery(e.target.value);
        }}
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
};

export default Search;
