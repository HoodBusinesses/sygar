import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { memberSchema, type MemberFormData } from "../schemas/organization";

interface AddMemberFormProps {
  onSubmit: (data: MemberFormData) => void;
  initialData?: MemberFormData;
}

export const AddMemberForm = ({
  onSubmit,
  initialData,
}: AddMemberFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: MemberFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-4">
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">Full Name</p>
          <Input
            {...register("fullName")}
            placeholder="Enter the full name"
            className="bg-gray-100 text-gray-950"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">Email</p>
          <Input
            {...register("email")}
            placeholder="Enter the organization email"
            className="bg-gray-100 text-gray-950"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">Role</p>
          <Select onValueChange={(value) => register("role").onChange({ target: { value } })}>
            <SelectTrigger className="text-gray-700">
              <SelectValue placeholder="Select the role" />
            </SelectTrigger>
            <SelectContent className="text-gray-700">
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">Action</p>
          <Select
            onValueChange={(value) => register("actionType").onChange({ target: { value } })}
          >
            <SelectTrigger className="text-gray-700">
              <SelectValue placeholder="Select the action type" />
            </SelectTrigger>
            <SelectContent className="text-gray-700">
              <SelectItem value="edit">Editing documents</SelectItem>
              <SelectItem value="view">Viewing only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          type="button" 
          onClick={handleSubmit(handleFormSubmit)}
          className="btn-blue rounded-md"
          >
          Add
        </Button>
      </div>
    </div>
  );
};