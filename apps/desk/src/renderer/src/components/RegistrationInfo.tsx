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
} from '../utils/schemas/formSchema'
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
    // Handle form submission
    console.log({ ...data, members })
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
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg text-gray-950 font-bold  mb-6">{t('registration.title')}</p>
              <Button className="custom-button bg-blue-600 hover:bg-blue-500" type="submit">
                {t('registration.buttons.import')}
              </Button>
            </div>
            <MembersTable
              members={members}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
            />

            <div className="mt-6">
              <AddMemberForm onSubmit={handleAddMember} initialData={editingMember?.data} />
            </div>
          </CardContent>
        </Card>

        <Button className="custom-button bg-blue-600 hover:bg-blue-500" type="submit">
          {t('registration.buttons.save')}
        </Button>
      </form>
    </FormProvider>
  )
}

export default RegistrationInfo
