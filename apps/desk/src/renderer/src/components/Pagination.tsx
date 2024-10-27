import React from 'react'
import { Button } from './ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number | React.ChangeEvent<HTMLSelectElement>): void => {
    if (typeof page === 'number') {
      onPageChange(page)
    } else {
      onPageChange(Number(page.target.value))
    }
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>Page</span>
        <select
          value={currentPage}
          onChange={handlePageChange}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <span>of {totalPages}</span>
      </div>

      {/* Back and Next Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`border border-gray-300 px-4 py-2 rounded-md text-gray-700 
      ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Back
        </Button>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-white bg-gray-800
      ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination
