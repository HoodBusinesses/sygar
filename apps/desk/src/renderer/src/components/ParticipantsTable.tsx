import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { Checkbox } from '../components/ui/checkbox'
import { cn } from './ui/lib/utils'

const TableHeadElements = [
  <Checkbox key="checkbox" />,
  'participantsTable.name',
  'participantsTable.email',
  'participantsTable.cin',
  'participantsTable.cnss',
  'participantsTable.status'
]

export interface Participant {
  id: number
  name: string
  email: string
  cin: string
  cnss: string
  status: string
}

interface ParticipantsTableProps {
  data: Participant[]
}

const ParticipantsTable: React.FC<ParticipantsTableProps> = ({ data }) => {
  const { t, isRtl } = useTranslate()

  return (
    <div className="border rounded-lg overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow className="border border-gray-200 rounded-t-lg">
            {TableHeadElements.map((element, index) => (
              <TableHead key={index} className={cn(isRtl && 'text-right', 'text-gray-950')}>
                {typeof element === 'string' ? t(element) : element}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((participant, index) => (
            <TableRow key={index} className="border-b border-gray-200">
              <TableCell className="text-gray-950">
                <div className="flex flex-row items-top space-x-2">
                  <Checkbox />
                  <p>{participant.id}</p>
                </div>
              </TableCell>
              <TableCell className="text-gray-950">{participant.name}</TableCell>
              <TableCell className="text-gray-500">{participant.email}</TableCell>
              <TableCell className="text-gray-500">{participant.cin}</TableCell>
              <TableCell className="text-gray-500">{participant.cnss}</TableCell>
              <TableCell className="">
                <span className="bg-green-200 text-green-800 text-xs px-2 py-1 uppercase rounded">
                  {participant.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ParticipantsTable
