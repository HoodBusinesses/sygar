'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AddMemberForm } from '../components/AddMemberForm'
import { MembersTable } from '../components/MembersTable'
import { OrganizationBasicInfo } from './organization/OrganizationBasicInfo'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import {
  organizationSchema,
  type MemberFormData,
  type OrganizationFormData
} from '../utils/schemas/organization'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { useToast } from '@renderer/hooks/useToast'

const staticMembers: MemberFormData[] = [
  {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    role: 'manager',
    actionType: 'edit'
  },
  {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'employee',
    actionType: 'view'
  }
]

const RegistrationInfo = () => {
  // putNotification('Registration', 'Page rendered successfully');

  const { t } = useTranslate()
  // const permissions = usePermissions();
  const [members, setMembers] = useState<MemberFormData[]>(staticMembers)
  const [editingMember, setEditingMember] = useState<{
    index: number
    data: MemberFormData
  } | null>(null)
  const { addToast } = useToast()
  // const router = useRouter();
  const [organization, setOrganization] = useState(null)

  const methods = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema)
  })

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      // Handle form submission
      console.log({ ...data, members })
      addToast('Success', 'Organization information saved successfully')
    } catch (error) {
      addToast('Error', 'Failed to save organization information')
    }
  }
  // useEffect(() => {
  //   if (router.query.organization) {
  //     if (typeof router.query.organization === "string") {
  //       setOrganization(JSON.parse(router.query.organization));
  //     }
  //     console.log("aaaaa : ", organization);

  //     // infoToast('Organization data loaded successfully');
  //   }
  // }, [router.query.organization]);
  const handleAddMember = (data: MemberFormData) => {
    if (editingMember !== null) {
      setMembers(members.map((member, i) => (i === editingMember.index ? data : member)))
      setEditingMember(null)
    } else {
      setMembers([...members, data])
    }
  }

  const handleEditMember = (index: number) => {
    setEditingMember({ index, data: members[index] })
  }

  const handleDeleteMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }
  // console.log(organization);

  // if (
  //   !permissions.registration?.canModify &&
  //   !permissions.registration.canView
  // ) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <p className="text-gray-950">{t("noPermission")}</p>
  //     </div>
  //   );
  // }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <OrganizationBasicInfo organization={organization} />

        <Card className="p-6 mb-6">
          <CardContent>
            {/* Title and Enhanced Import Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Organization Members Information
              </h2>
              <Button
                className="flex items-center gap-2 border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Import
              </Button>
            </div>

            {/* Members Table */}
            <MembersTable
              members={members}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
            />

            {/* Add Member Form */}
            <div className="mt-6 flex items-center gap-4">
              <input
                className="border border-gray-300 rounded-lg py-2 px-4 text-sm text-gray-700 w-full"
                placeholder="Enter the full name"
              />
              <input
                className="border border-gray-300 rounded-lg py-2 px-4 text-sm text-gray-700 w-full"
                placeholder="Enter the email"
              />
              <select className="border border-gray-300 rounded-lg py-2 px-4 text-sm text-gray-700">
                <option>Select the role</option>
              </select>
              <select className="border border-gray-300 rounded-lg py-2 px-4 text-sm text-gray-700">
                <option>Select the action type</option>
              </select>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg">
                Add
              </Button>
              <Button className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-lg">
                Cancel
              </Button>
            </div>
            <div className="mt-4 flex">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-16 rounded-lg">
                Save
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
      </form>
    </FormProvider>
  )
}

export default RegistrationInfo
