import React from "react";
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
import { memberSchema, type MemberFormData } from "../schemas/organization";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    // defaultValues: members,
  });
  return (
    <Table className="border-2 rounded-lg border-gray-200 border-separate">
      <TableHeader>
        <TableRow className="border border-gray-200 rounded-t-lg">
          <TableHead className="text-gray-950">ID</TableHead>
          <TableHead className="text-gray-950">Full Name</TableHead>
          <TableHead className="text-gray-950">Email</TableHead>
          <TableHead className="text-gray-950">Role</TableHead>
          <TableHead className="text-gray-950">Action Type</TableHead>
          <TableHead className="text-gray-950">Actions</TableHead>
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
              {/* <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {member.actionType === "edit"
                  ? "Editing documents"
                  : "Viewing only"}
              </span> */}
              <Select
                
                onValueChange={(value) =>
                  register("actionType").onChange({ target: { value } })
                }
              >
                <SelectTrigger className="bg-blue-100 text-blue-800 rounded w-auto">
                  <SelectValue placeholder={member.actionType === 'edit' ? 'Editing documents' : 'Viewing only'} />
                </SelectTrigger>
                <SelectContent className="bg-blue-100 text-gray-700">
                  <SelectItem value="edit">Editing documents</SelectItem>
                  <SelectItem value="view">Viewing only</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
