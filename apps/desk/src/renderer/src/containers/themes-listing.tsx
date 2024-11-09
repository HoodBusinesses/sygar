import withAuth from '@renderer/hoc/with-auth'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { CustomTable } from '@renderer/components/custom-table'
import { themeColumns } from '@renderer/components/formations/themes-columns'
import { mockThemes } from '@renderer/utils/static/organizations'
import { useNavigate } from '@tanstack/react-router'

const ThemesListing: React.FC = () => {
  const { isRtl } = useTranslate()
  const navigate = useNavigate()

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        headTitle="formation.formation"
        columns={themeColumns(() => {
          console.log('Navigating to /themes-listing/group-themes')
          navigate({ to: '/group-listing' as string })
        })}
        data={mockThemes}
      />
    </div>
  )
}

export default withAuth(ThemesListing)
