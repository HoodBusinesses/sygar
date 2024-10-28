import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { useForm } from 'react-hook-form'
import { memberSchema, type MemberFormData } from '../utils/schemas/organization'
import MembersTableBody from './MembersTableBody'
import { Table, TableHead, TableHeader, TableRow } from './ui/table'

interface MembersTableProps {
  members: MemberFormData[]
  onEdit: (index: number) => void
  onDelete: (index: number) => void
}

export const MembersTable = ({ members, onEdit, onDelete }: MembersTableProps) => {
  const { t } = useTranslate()

  const {
    register,
    formState: {}
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema)
  })

  return (
      <Table className="border-2 rounded-lg border-gray-200 border-separate">
        <TableHeader>
          <TableRow className="border border-gray-200 rounded-t-lg">
            <TableHead className="text-gray-950">{t('membersTable.id')}</TableHead>
            <TableHead className="text-gray-950">{t('membersTable.fullName')}</TableHead>
            <TableHead className="text-gray-950">{t('membersTable.email')}</TableHead>
            <TableHead className="text-gray-950">{t('membersTable.role')}</TableHead>
            <TableHead className="text-gray-950">{t('membersTable.actionType')}</TableHead>
            <TableHead className="text-gray-950">{t('membersTable.actions')}</TableHead>
          </TableRow>
        </TableHeader>

        {/* Tbale Bodywrapper */}
        <MembersTableBody
          register={register}
          members={members}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Table>
  )
}
