import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { cn } from './ui/lib/utils'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { Checkbox } from './ui/checkbox'
import OrgTableButtons from './OrgTableButtons'
import { Button } from './ui/button'

const ThemeHeaderElements = [
  <Checkbox key="checkbox" />,
  'themesTable.name',
  'themesTable.year',
  'themesTable.price',
  'themesTable.groups',
  'themesTable.options'
]

export interface Theme {
  id: number
  name: string
  identifier: string
  year: string
  price: number
}

interface ThemesTableProps {
  data: Theme[]
  openEditModal: () => void
  openGroupsModal: () => void
  openDeleteModal: () => voids
}

const ThemesTable: React.FC<ThemesTableProps> = ({
  data,
  openDeleteModal,
  openEditModal,
  openGroupsModal
}): JSX.Element => {
  const { t, isRtl } = useTranslate()
  return (
    <div className="border rounded-lg overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow className="border border-gray-200 rounded-t-lg">
            {ThemeHeaderElements.map((element, index) => (
              <TableHead key={index} className={cn(isRtl && 'text-right', 'text-gray-950')}>
                {typeof element === 'string' ? t(element) : element}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((theme, index) => (
            <TableRow key={index} className="border-b border-gray-200">
              <TableCell className="text-gray-950">
                <div className="flex flex-row items-top space-x-2">
                  <Checkbox />
                  <p>{theme.id}</p>
                </div>
              </TableCell>
              <TableCell className="text-gray-950">{theme.name}</TableCell>
              <TableCell className="text-gray-950">{theme.year}</TableCell>
              <TableCell className="text-gray-950">
                {theme.price} <p>{t('themesTable.mad')}</p>
              </TableCell>
              <TableCell className="text-gray-500">
                <Button className="hover:underline text-blue-500 px-4 py-1">
                  {t('themesTable.checkGroup')}
                </Button>
              </TableCell>
              <TableCell className="text-gray-500">
                <OrgTableButtons
                  subscription={false}
                  openDeleteModal={openDeleteModal}
                  openEditModal={openEditModal}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ThemesTable
