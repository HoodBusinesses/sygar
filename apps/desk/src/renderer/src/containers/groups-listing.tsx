import React from 'react'
import { useTable, ColumnDef } from '@tanstack/react-table'
import { useReactTable } from '@tanstack/react-table'

// Define data type
type RowData = {
  facilitator: string
  trainer: string
  theme: string
  location: string
  date: string
}

// Sample data
const data: RowData[] = [
  {
    facilitator: 'John Doe',
    trainer: 'Jane Smith',
    theme: 'Team Building',
    location: 'New York',
    date: '2024-11-01'
  }
  // Add more rows as needed
]

// Define columns
const columns: ColumnDef<RowData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        onChange={(e) => table.getToggleAllRowsSelectedHandler()(e.target.checked)}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    )
  },
  {
    accessorKey: 'facilitator',
    header: 'FACILATOR'
  },
  {
    accessorKey: 'trainer',
    header: 'Trainer'
  },
  {
    accessorKey: 'theme',
    header: 'Theme'
  },
  {
    accessorKey: 'location',
    header: 'Location'
  },
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    id: 'options',
    header: 'Options',
    cell: () => <button>Options</button>
  }
]

const groupsPage = (): JSX.Element => {
  const table = useTable({ data, columns })

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.isPlaceholder ? null : header.renderHeader()}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default groupsPage
