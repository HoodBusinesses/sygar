import { MemberFormData } from "@renderer/utils/schemas/organization";

export const INITIAL_MEMBERS: MemberFormData[] = [
  { fullName: 'John Doe', email: 'john.doe@example.com', role: 'manager', actionType: 'edit' },
  { fullName: 'Jane Smith', email: 'jane.smith@example.com', role: 'employee', actionType: 'view' }
]
