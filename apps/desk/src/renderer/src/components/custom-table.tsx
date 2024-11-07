import { useTranslate } from '@renderer/hooks/useTranslate'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import SearchTableInput from './costum-data/search-table-Input'
import Filter from './Filter'
import Pagination from './Pagination'
import SortByPopover from './SortBy'
import { cn } from './ui/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function CustomTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [rowSelection, setRowSelection] = useState({})

  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter
    }
  })

  const { t } = useTranslate()

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Left Section: Search Input */}
        <SearchTableInput onChange={(e) => table.setGlobalFilter(e.target.value)} />

        {/* Right Section: Buttons and Profile */}
        <div className="flex gap-4">
          <SortByPopover onSort={setSorting} />
          <Filter OnFilter={setSorting} />
        </div>
      </div>

      <Table className="border rounded-lg overflow-hidden overflow-x-auto">
        <TableHeader className="border border-gray-200 rounded-t-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.isPlaceholder) {
                  return null
                }
                if (typeof(header.column.columnDef.header) === 'function') {
                    return (
                      <TableHead key={header.id} className={'text-center px-9 font-semibold'}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                }
                return (
                  <TableHead key={header.id} className={'text-center font-semibold'}>
                    {t(header.column.columnDef.header as string)}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={cn(row.getIsSelected() && 'bg-gray-100', 'hover:bg-gray-50')}
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination table={table} />
    </div>
  )
}
