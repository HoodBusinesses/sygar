import React, { useState, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { useToast } from '@/components/ui/use-toast'
// import { OrganizationBasicInfo } from '@/components/OrganizationBasicInfo'
// import { MembersTable } from '@/components/MembersTable'
// import { AddMemberForm
import withAuth from '@renderer/hoc/with-auth'
// import {
//   MemberFormData,
//   OrganizationFormData,
//   organizationSchema
// } from '@/utils/schemas/organization'
import { useToast } from '@renderer/components/ui/use-toast'
import { OrganizationBasicInfo } from '@renderer/components/OrganizationBasicInfo'
import { Card, CardContent } from '@renderer/components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { MembersTable } from '@renderer/components/MembersTable'
import { AddMemberForm } from '@renderer/components/AddMemberForm'
import { MemberFormData, OrganizationFormData, organizationSchema } from '@renderer/utils/schemas/organization'

// Moved to a separate file: data/mockData.ts
const INITIAL_MEMBERS: MemberFormData[] = [
  { fullName: 'John Doe', email: 'john.doe@example.com', role: 'manager', actionType: 'edit' },
  { fullName: 'Jane Smith', email: 'jane.smith@example.com', role: 'employee', actionType: 'view' }
]

// Moved to a separate service: services/organizationService.ts
const useOrganizationData = (organizationId: string | null) => {
  return useQuery(
    ['organizationData', organizationId],
    async () => {
      if (!organizationId) return null
      const response = await fetch(`/api/organizations/${organizationId}`)
      if (!response.ok) throw new Error('Failed to fetch organization')
      return response.json()
    },
  )
}

const Registration: React.FC = () => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const organizationId = useMemo(
    () => new URLSearchParams(window.location.search).get('organization'),
    []
  )

  const [members, setMembers] = useState<MemberFormData[]>(INITIAL_MEMBERS)
  const [editingMember, setEditingMember] = useState<{
    index: number
    data: MemberFormData
  } | null>(null)

  const { data: organization, error, isLoading } = useOrganizationData(organizationId)

  const methods = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: useMemo(
      () => ({
        // default values
      }),
      []
    )
  })

  const handleSubmit = async (data: OrganizationFormData) => {
    try {
      // Assuming you have an API endpoint to save the data
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, members })
      })

      if (!response.ok) throw new Error('Failed to save')

      toast({
        title: t('success'),
        description: t('registration.messages.saveSuccess')
      })
    } catch (error) {
      toast({
        title: t('error'),
        description: t('registration.messages.saveError'),
        variant: 'destructive'
      })
    }
  }

  const memberOperations = useMemo(
    () => ({
      handleAdd: (data: MemberFormData) => {
        setMembers((prev) => [...prev, data])
        setEditingMember(null)
      },
      handleUpdate: (data: MemberFormData, index: number) => {
        setMembers((prev) => prev.map((member, i) => (i === index ? data : member)))
        setEditingMember(null)
      },
      handleEdit: (index: number) =>
        setEditingMember({
          index,
          data: members[index]
        }),
      handleDelete: (index: number) => setMembers((prev) => prev.filter((_, i) => i !== index))
    }),
    [members]
  )

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="text-red-500 p-4">Error loading organization data</div>

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
          <OrganizationBasicInfo organization={organization} />

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-950">{t('registration.title')}</h2>
                <Button variant="default">{t('registration.buttons.import')}</Button>
              </div>

              <MembersTable
                members={members}
                onEdit={memberOperations.handleEdit}
                onDelete={memberOperations.handleDelete}
              />

              <AddMemberForm
                onSubmit={
                  editingMember
                    ? (data) => memberOperations.handleUpdate(data, editingMember.index)
                    : memberOperations.handleAdd
                }
                initialData={editingMember?.data}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              {t('registration.buttons.save')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default withAuth(Registration)
