import withAuth from '@renderer/hoc/with-auth'
import { useTranslate } from '@renderer/hooks/useTranslate'
import ListingHeader from '@renderer/components/ListingHeader'
import { CustomTable } from '@renderer/components/custom-table'
import { themeColumns } from '@renderer/components/themes/themes-columns'
import { mockGroups, mockThemes } from '@renderer/utils/static/organizations'
import { useState } from 'react'
import { Button } from '@renderer/components/ui/button'
import RegistrationInfo from '@renderer/components/RegistrationInfo'
import { groupColumn } from '@renderer/components/formation/group-columns'

const ThemesListing: React.FC = () => {
  const { isRtl } = useTranslate()
  const [EditOrg, setEditOrg] = useState(false)
  const [groupThemes, setGroupThemes] = useState(false)

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      {EditOrg ? (
        <>
          {/* Header */}
          <Button onClick={setEditOrg.bind(null, false)}>back to org</Button>
          <RegistrationInfo />
        </>
      ) : groupThemes ? (
        <>
          {/* Header */}
          <Button onClick={setGroupThemes.bind(null, false)}>back to themes</Button>
          <ListingHeader headTitle="Group" />
          <CustomTable columns={groupColumn()} data={mockGroups} />
        </>
      ) : (
        <>
          {/* Header */}
          <ListingHeader headTitle="Formation" />
          <CustomTable
            columns={themeColumns(setEditOrg.bind(null, true), setGroupThemes.bind(null, true))}
            data={mockThemes}
          />
        </>
      )}
    </div>
  )
}

export default withAuth(ThemesListing)
