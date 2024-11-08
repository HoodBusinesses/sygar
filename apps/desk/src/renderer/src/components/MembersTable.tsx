import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useForm } from 'react-hook-form';
import { memberSchema, type MemberFormData } from '../utils/schemas/formSchema';
import MembersTableBody from './MembersTableBody';
import { Table, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from './ui/lib/utils';

interface MembersTableProps {
  members: MemberFormData[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export const MembersTable = ({
  members,
  onEdit,
  onDelete,
}: MembersTableProps) => {
  const { t, isRtl } = useTranslate();

  const {
    register,
    formState: {},
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  });

  const TableHeadElements = [
    'membersTable.id',
    'membersTable.fullName',
    'membersTable.email',
    'membersTable.role',
    'membersTable.actionType',
    'membersTable.actions',
  ];

  return (
    //refactor to use the Table component
    <Table className="border-2 rounded-lg border-gray-200 border-separate">
      <TableHeader>
        <TableRow className="border border-gray-200 rounded-t-lg">
          {TableHeadElements.map((element, index) => (
            <TableHead
              key={index}
              className={cn(
                isRtl && 'text-right',
                'text-gray-950 bg-gray-200 rounded-t-lg'
              )}
            >
              {t(element)}
            </TableHead>
          ))}
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
  );
};
