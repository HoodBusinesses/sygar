import { useTranslate } from '@renderer/hooks/useTranslate'
import { useAppDispatch } from '@renderer/store/hooks'
import { changeLang, langs } from '@renderer/store/slices/lang.slice'
import { GrLanguage } from 'react-icons/gr'

export default function SelectLanguage(): JSX.Element {
  const { lng: Language } = useTranslate();

  const dispatcher = useAppDispatch();

  const changeLanguage = (lng: string): void => {
    const lang = langs.find((lang) => lang.id === lng)
    dispatcher(
      changeLang({
        name: lang?.name!,
        id: lang?.id!,
        isRtl: lang?.isRtl!
      })
    )
  }

  return (
    <div className="self-start mb-4 flex items-center font-poppins space-x-1 text-gray-500 hover:text-gray-700">
      <GrLanguage className="text-gray-500" />

      <select
        className="border p-1 rounded"
        value={Language.id}
        onChange={(e) => changeLanguage(e.target.value)} // Directly update the language based on the selected option
      >
        {langs.map((lang, index) => (
          <option key={index} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
