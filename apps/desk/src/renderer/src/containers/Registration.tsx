import { zodResolver } from '@hookform/resolvers/zod'
import { AddMemberForm } from '@renderer/components/AddMemberForm'
import { MembersTable } from '@renderer/components/MembersTable'
import { OrganizationBasicInfo } from '@renderer/components/OrganizationBasicInfo'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent } from '@renderer/components/ui/card'
import { useToast } from '@renderer/components/ui/use-toast'
import withAuth from '@renderer/hoc/with-auth'
import {
  MemberFormData,
  OrganizationFormData,
  organizationSchema
} from '@renderer/utils/schemas/organization'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

const staticMembers: MemberFormData[] = [
  { fullName: 'John Doe', email: 'john.doe@example.com', role: 'manager', actionType: 'edit' },
  { fullName: 'Jane Smith', email: 'jane.smith@example.com', role: 'employee', actionType: 'view' }
]

const mockOrganizations = Array.from({ length: 50 }, (_, index) => {
  const year = 2020 + Math.floor(index / 12)
  const month = (index % 12) + 1
  const formattedMonth = month.toString().padStart(2, '0')
  return {
    id: index + 1,
    image: '/api/placeholder/40/40',
    rs: `Organization ${index + 1}`,
    cnss: `CNSS-${index + 1}`,
    address: `Address ${index + 1}`,
    email: `org${index + 1}@example.com`,
    responsibleName: `Manager ${index + 1}`,
    trainingManagerName: `Trainer ${index + 1}`,
    date: `**/${formattedMonth}/${year}`
  }
})

const fetchMockOrganizationData = (organizationId: string | null) => {
  if (!organizationId) return null
  const organization = mockOrganizations.find((org) => org.id === Number(organizationId))
  if (!organization) throw new Error('Organization not found')
  return organization
}

const Registration: React.FC = () => {
  const { t } = useTranslation()
  // const { addtoast } = useToast();

  const [members, setMembers] = useState<MemberFormData[]>(staticMembers)
  const [editingMember, setEditingMember] = useState<{
    index: number
    data: MemberFormData
  } | null>(null)

  const organizationId = new URLSearchParams(location.search).get('organization')

  const {
    data: organization,
    error,
    isLoading
  } = useQuery(
    ['organizationData', organizationId],
    () => fetchMockOrganizationData(organizationId),
    { enabled: !!organizationId }
  )

  const methods = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema)
  })

  const onSubmit = (data: OrganizationFormData) => {
    console.log({ ...data, members })
    // addtoast("Success", "Organization information saved successfully");
  }

  const handleAddOrUpdateMember = (data: MemberFormData) => {
    setMembers((prevMembers) =>
      editingMember
        ? prevMembers.map((member, i) => (i === editingMember.index ? data : member))
        : [...prevMembers, data]
    )
    setEditingMember(null)
  }

  const handleEditMember = (index: number) => setEditingMember({ index, data: members[index] })
  const handleDeleteMember = (index: number) =>
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index))

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading organization data</p>

  console.log('organization', organization);

  return (
    <div className="space-y-6 w-full h-full min-h-screen mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>

          <OrganizationBasicInfo organization={organization} />

          <Card className="p-6 mb-6">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <p className="text-lg text-gray-950 font-bold mb-6">{t('registration.title')}</p>
                <Button className="btn-blue" type="submit">
                  {t('registration.buttons.import')}
                </Button>
              </div>

              <MembersTable
                members={members}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
              />

              <AddMemberForm onSubmit={handleAddOrUpdateMember} initialData={editingMember?.data} />
            </CardContent>
          </Card>

          <Button className="btn-blue" type="submit">
            {t('registration.buttons.save')}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default withAuth(Registration)
