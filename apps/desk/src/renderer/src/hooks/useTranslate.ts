import i18n from '@renderer/assets/localization/i18n'
import { useAppSelector } from '@renderer/store/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useTranslate = () => {
  const selectedLang = useAppSelector((state) => state.lang.main)

  const { t } = useTranslation();

  useEffect(() => {
    if (i18n.language !== selectedLang.id) {
      
      i18n.changeLanguage(selectedLang.id)
    }
  }, [selectedLang.id])

  return { t, isRtl: selectedLang.isRtl, lng: selectedLang }
}
