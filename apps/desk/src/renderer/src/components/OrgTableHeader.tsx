import { TableHead, TableHeader, TableRow } from './ui/table'
import { useTranslate } from '@renderer/hooks/useTranslate'

const OrgTableHeader = (): JSX.Element => {
  const { t, isRtl } = useTranslate()

  return (
    <TableHeader className='text-w'>
      {/* <TableHeader>
        <TableRow className="border border-gray-200 rounded-t-lg">
          {TableHeadElements.map((element, index) => (
            <TableHead key={index} className="text-gray-950 text-right">
              {t(element)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader> */}
      <TableRow className="border border-gray-200 rounded-t-lg">
        <TableHead className="text-gray-600 text-right">{t('organization.image')}</TableHead>
        <TableHead className="text-gray-600 text-right">{t('organization.rs')}</TableHead>
        <TableHead className="text-gray-600 text-right">{t('organization.cnss')}</TableHead>
        <TableHead className="text-gray-600 text-right">{t('organization.address')}</TableHead>
        <TableHead className="text-gray-600 text-right">{t('organization.email')}</TableHead>
        <TableHead className="text-gray-600 text-right">{t('organization.responsibleName')}</TableHead>
        <TableHead className="text-gray-600 text-right">{t('organization.trainingManagerName')}</TableHead>
        <TableHead className="text-gray-600 text-right">{t('organization.enabled')}</TableHead>
        <TableHead className="text-gray-600 text-right">{t('organization.actions')}</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default OrgTableHeader
