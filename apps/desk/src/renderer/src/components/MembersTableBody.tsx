import { useTranslate } from '@renderer/hooks/useTranslate'
import { MemberFormData } from '@renderer/utils/schemas/organization'
import { Edit, Trash2 } from 'lucide-react'
import { UseFormRegister } from 'react-hook-form'
import { Button } from './ui/button'
import { cn } from './ui/lib/utils'
import SelectInputItem from './ui/select-input-item'
import { TableBody, TableCell, TableRow } from './ui/table'

interface MembersTableBodyProps {
  register: UseFormRegister<MemberFormData>
  members: MemberFormData[]
  onEdit: (index: number) => void
  onDelete: (index: number) => void
}
export default function MembersTableBody({
  register,
  members,
  onEdit,
  onDelete
}: MembersTableBodyProps): JSX.Element {
  const { t, isRtl } = useTranslate()
  return (
    <TableBody>
      {members.map((member, index) => (
        <TableRow
          key={index}
          className="bg-white hover:bg-gray-50 rounded-lg border-b border-gray-200 last:border-0" // Rounded and spaced rows
        >
          {/* ID Column */}
          <TableCell className="text-gray-950 py-3 px-4 text-sm">
            {String(index + 1).padStart(5, '0')}
          </TableCell>

          {/* Full Name Column */}
          <TableCell className="text-gray-950 py-3 px-4 text-sm">{member.fullName}</TableCell>

          {/* Email Column */}
          <TableCell className="text-gray-950 py-3 px-4 text-sm">{member.email}</TableCell>

          {/* Role Column */}
          <TableCell className="py-3 px-4">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
              {member.role}
            </span>
          </TableCell>

          {/* Action Type Column with Select */}
          <TableCell className="py-3 px-4">
            <SelectInputItem
              label=""
              onValueChange={(value) => register('actionType').onChange({ target: { value } })}
              items={[
                { value: 'edit', translationKey: 'membersTable.editingDocuments' },
                { value: 'view', translationKey: 'membersTable.viewingOnly' }
              ]}
              placeholder={
                member.actionType === 'edit'
                  ? t('membersTable.editingDocuments')
                  : t('membersTable.viewingOnly')
              }
              classNames={{
                trigger:
                  'bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium w-auto',
                content: 'bg-white text-gray-700'
              }}
            />
          </TableCell>

          {/* Action Buttons Column */}
          <TableCell className="py-3 px-4 flex gap-2 justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(index)}
              className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-200"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(index)}
              className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
