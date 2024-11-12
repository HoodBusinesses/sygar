import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div className="max-h-screen flex flex-col w-full items-center justify-center bg-gray-100 text-gray-700">
      <div className="w-full p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Tables</h1>
          <span className="text-blue-500 cursor-pointer">formation section</span>
          <p className="text-gray-500 mt-1">A descriptive body text comes here</p>
        </div>

        {/* Search and Action Buttons */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-6 space-y-4 md:space-y-0 w-full">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search for organization by email or cnss"
              className="w-full p-2 pl-10 border border-gray-300 rounded-md outline-none"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold">
              Import
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
              Export
            </button>
          </div>
        </div>

        {/* Sort and Filter Buttons */}
        <div className="flex justify-end space-x-4 mb-6 w-full">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-500">
            Sort by
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-500">
            Filter
          </button>
        </div>

        {/* Table Header */}
        <div className="flex items-center text-gray-400 border-b border-gray-300 pb-2 mb-8 w-full">
          <div className="w-1/12">
            <input type="checkbox" className="form-checkbox" />
          </div>
          <div className="w-3/12">Name</div>
          <div className="w-2/12">Year</div>
          <div className="w-2/12">Price</div>
          <div className="w-3/12">Groups</div>
        </div>

        {/* No Data Illustration */}
        <div className="flex flex-col items-center w-full mt-20">
          <div className="bg-gray-200 rounded-full p-8 mb-6">
            {/* Placeholder SVG Icon */}
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="text-gray-400">
              <path
                fill="currentColor"
                d="M19 8h-1V6c0-1.1-.9-2-2-2h-2.02c-.46-1.28-1.65-2-2.98-2s-2.52.72-2.98 2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5-1H10c0-.55.45-1 1-1s1 .45 1 1zM6 6h2v2H6V6zm0 4h12v2H6v-2zm0 4h12v2H6v-2zm0 4h12v2H6v-2z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">You've got no data</h2>
          <p className="text-gray-500 mb-6">Start adding your rows informations!</p>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
            <FaPlus className="mr-2" /> Add Rows
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
