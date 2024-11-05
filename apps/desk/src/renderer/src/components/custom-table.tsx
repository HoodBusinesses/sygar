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
import { useTranslate } from '@renderer/hooks/useTranslate'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Filter from './Filter'
import Pagination from './Pagination'
import SortByPopover from './SortBy'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function CustomTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters
    }
  })

  const { t, isRtl } = useTranslate()

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Left Section: Search Input */}
        <div dir={isRtl ? 'rtl' : 'ltr'} className="relative">
          <Input
            placeholder={''}
            className="pl-10 text-gray-600 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none w-64"
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          />
          <FiSearch className="absolute top-[0.6rem] left-2 text-gray-400 h-5 w-5" />
        </div>

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
                return (
                  <TableHead key={header.id} className={'rtl:text-right'}>
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
                className="hover:bg-gray-50"
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
