import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@radix-ui/react-select'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { MemberFormData } from '@renderer/utils/schemas/organization'
import { Edit, Trash2 } from 'lucide-react'
import { UseFormRegister } from 'react-hook-form'
import { Button } from './ui/button'
import { cn } from './ui/lib/utils'
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
        <TableRow key={index} className="border-b border-gray-900">
          <TableCell className="text-gray-950">{String(index + 1).padStart(5, '0')}</TableCell>
          <TableCell className="text-gray-950">{member.fullName}</TableCell>
          <TableCell className="text-gray-950">{member.email}</TableCell>
          <TableCell className="">
            <span className="bg-green-200 text-green-800 px-4 py-2 uppercase rounded">
              {member.role}
            </span>
          </TableCell>
          <TableCell className="text-gray-950">
            <Select
              onValueChange={(value) => register('actionType').onChange({ target: { value } })}
            >
              <SelectTrigger className="bg-blue-100 text-blue-800 rounded w-auto">
                <SelectValue
                  placeholder={
                    member.actionType === 'edit'
                      ? t('membersTable.editingDocuments')
                      : t('membersTable.viewingOnly')
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-blue-100 text-gray-700">
                <SelectItem value="edit">{t('membersTable.editingDocuments')}</SelectItem>
                <SelectItem value="view">{t('membersTable.viewingOnly')}</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(index)}
              className={cn(
                isRtl ? 'rounded-r-full' : 'rounded-l-full',
                'bg-blue-100 text-blue-800'
              )}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(index)}
              className={cn(isRtl ? 'rounded-l-full' : 'rounded-r-full', 'bg-red-100 text-red-800')}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
