import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";
import { memberSchema, type MemberFormData } from "../utils/schemas/organization";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../contexts/PermissionsContext";

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
  const { t } = useTranslation();
  const permissions = usePermissions();

  const {
    register,
    formState: { },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  });

  return (
    <>
      <Table className="border-2 rounded-lg border-gray-200 border-separate">
        <TableHeader>
          <TableRow className="border border-gray-200 rounded-t-lg">
            <TableHead className="text-gray-950">{t("membersTable.id")}</TableHead>
            <TableHead className="text-gray-950">{t("membersTable.fullName")}</TableHead>
            <TableHead className="text-gray-950">{t("membersTable.email")}</TableHead>
            <TableHead className="text-gray-950">{t("membersTable.role")}</TableHead>
            <TableHead className="text-gray-950">{t("membersTable.actionType")}</TableHead>
            <TableHead className="text-gray-950">{t("membersTable.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={index} className="border-b border-gray-900">
              <TableCell className="text-gray-950">
                {String(index + 1).padStart(5, "0")}
              </TableCell>
              <TableCell className="text-gray-950">{member.fullName}</TableCell>
              <TableCell className="text-gray-950">{member.email}</TableCell>
              <TableCell className="">
                <span className="bg-green-200 text-green-800 px-4 py-2 uppercase rounded">
                  {member.role}
                </span>
              </TableCell>
              <TableCell className="text-gray-950">
                {permissions?.registration?.canModify ? <Select
                  onValueChange={(value) =>
                    register("actionType").onChange({ target: { value } })
                  }
                >
                  <SelectTrigger className="bg-blue-100 text-blue-800 rounded w-auto">
                    <SelectValue
                      placeholder={
                        member.actionType === "edit"
                          ? t("membersTable.editingDocuments")
                          : t("membersTable.viewingOnly")
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-100 text-gray-700">
                    <SelectItem value="edit">{t("membersTable.editingDocuments")}</SelectItem>
                    <SelectItem value="view">{t("membersTable.viewingOnly")}</SelectItem>
                  </SelectContent>
                </Select> : <TableCell className="bg-blue-100 text-blue-800 rounded-md w-auto" >{member.actionType === "edit" ? t("membersTable.editingDocuments") : t("membersTable.viewingOnly")}</TableCell>}
              </TableCell>
              {permissions?.registration?.canModify &&
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(index)}
                    className="bg-blue-100 text-blue-800 rounded-l-full"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(index)}
                    className="bg-red-100 text-red-800 rounded-r-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
