import { useTranslate } from '@renderer/hooks/useTranslate'
import { Table } from '@tanstack/react-table'
import React from 'react'
import { Button } from './ui/button'
import { cn } from './ui/lib/utils'

interface PaginationProps<TData> {
  table: Table<TData>
}

function Pagination<TData>({ table }: PaginationProps<TData>) {
  const { t } = useTranslate();
  const handlePageChange = (page: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedPage = Number(page.target.value)
    table.setPageIndex(selectedPage - 1);
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>{t('organization.page')}</span>
        <select
          value={table.getState().pagination.pageIndex + 1}
          onChange={handlePageChange}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <span>
          {t('organization.of')} {table.getPageCount()}
        </span>
      </div>

      {/* Back and Next Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={table.nextPage}
          disabled={!table.getCanNextPage()}
          className={`border border-gray-300 px-4 py-2 rounded-md text-gray-700 
      ${!table.getCanNextPage() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {t('organization.next')}
        </Button>

        <Button
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
          className={cn(
            'px-4 py-2 rounded-md text-white bg-gray-800',
            !table.getCanPreviousPage() && 'opacity-50 cursor-not-allowed'
          )}
        >
          {t('organization.previous')}
        </Button>
      </div>
    </div>
  )
}

export default Pagination
