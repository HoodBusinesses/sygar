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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination table={table} />
    </div>
  );
}