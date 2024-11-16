import { useTranslate } from '@renderer/hooks/useTranslate';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import ListingHeader from './ListingHeader';
import Pagination from './Pagination';
import { cn } from './ui/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { FaPlus } from 'react-icons/fa';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  headTitle: string;
}

export function CustomTable<TData, TValue>({
  columns,
  data,
  headTitle,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [rowSelection, setRowSelection] = useState({});

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
      globalFilter,
    },
  });

  const { t } = useTranslate();

  return (
    <div>
      {/* Search and import export */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <ListingHeader
          headTitle={headTitle}
          onSearchChange={(e) => table.setGlobalFilter(e.target.value)}
        />
      </div>

      <Table className="border rounded-lg overflow-hidden overflow-x-auto">
        <TableHeader className="border border-gray-200 rounded-t-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.isPlaceholder) {
                  return null;
                }
                if (typeof header.column.columnDef.header === 'function') {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.column.id === 'id' && 'rtl:!pr-8 ltr:!pl-8',
                        'font-semibold'
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                }
                return (
                  <TableHead
                    key={header.id}
                    className={'text-center font-semibold'}
                  >
                    {t(header.column.columnDef.header as string)}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={cn(
                  row.getIsSelected() && 'bg-gray-100',
                  'hover:bg-gray-50'
                )}
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      cell.column.id === 'image' && 'p-0',
                      'px-0',
                      index === 0 &&
                        cell.column.id === 'id' &&
                        'rtl:!pr-3 ltr:!pl-3'
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {/* No Data Illustration */}
                <div className="flex flex-col items-center w-full mt-20">
                  <div className="bg-gray-200 rounded-full p-8 mb-6">
                    {/* Placeholder SVG Icon */}
                    <svg
                      width="64"
                      height="64"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="text-gray-400"
                    >
                      <path
                        fill="currentColor"
                        d="M19 8h-1V6c0-1.1-.9-2-2-2h-2.02c-.46-1.28-1.65-2-2.98-2s-2.52.72-2.98 2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5-1H10c0-.55.45-1 1-1s1 .45 1 1zM6 6h2v2H6V6zm0 4h12v2H6v-2zm0 4h12v2H6v-2zm0 4h12v2H6v-2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold mb-2">
                    You've got no data
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Start adding your rows informations!
                  </p>
                  <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
                    <FaPlus className="mr-2" /> Add Rows
                  </button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination table={table} />
    </div>
  );
}
