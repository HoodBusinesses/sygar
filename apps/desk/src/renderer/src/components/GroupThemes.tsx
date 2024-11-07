import React from 'react'
import { mockGroups } from '@renderer/utils/static/organizations'
import { CustomTable } from '@renderer/components/custom-table'
import { groupColumn } from './formations/groups-columns'
import ListingHeader from './ListingHeader'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { useNavigate } from '@tanstack/react-router'
import withAuth from '@renderer/hoc/with-auth'
import { Outlet } from '@tanstack/react-router'

const GroupThemes: React.FC = () => {
  const { isRtl } = useTranslate()
  const navigate = useNavigate()
  console.log('GroupThemes -> navigate', navigate)
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <ListingHeader headTitle="group.groups" />
      <CustomTable
        columns={groupColumn(() => {
          navigate({ to: '/themes-listing/participants' as string })
        })}
        data={mockGroups}
      />
      <Outlet />
    </div>
  )
}

export default withAuth(GroupThemes)
