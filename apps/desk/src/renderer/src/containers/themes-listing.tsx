import withAuth from '@renderer/hoc/with-auth'
import { useTranslate } from '@renderer/hooks/useTranslate'
import ListingHeader from '@renderer/components/ListingHeader'
import { CustomTable } from '@renderer/components/custom-table'
import { themeColumns } from '@renderer/components/formations/themes-columns'
import { mockGroups, mockParticipant, mockThemes } from '@renderer/utils/static/organizations'
import { useState } from 'react'
import { Button } from '@renderer/components/ui/button'
import RegistrationInfo from '@renderer/components/RegistrationInfo'
import { groupColumn } from '@renderer/components/formations/groups-columns'
import { participantColumns } from '@renderer/components/formations/participants-columns'
import { Outlet } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'

const ThemesListing: React.FC = () => {
  const { isRtl } = useTranslate()
  const navigate = useNavigate()

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <ListingHeader headTitle="formation.formation" />
      <CustomTable
        columns={themeColumns(() => {
          console.log("Navigating to /themes-listing/group-themes")
          navigate({ to: '/themes-listing/group-themes' })})}
        data={mockThemes}
      />
      <Outlet />
    </div>
  )
}

export default withAuth(ThemesListing)
