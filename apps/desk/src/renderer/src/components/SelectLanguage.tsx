import { useTranslate } from '@renderer/hooks/useTranslate'
import { useAppDispatch } from '@renderer/store/hooks'
import { changeLang, langs } from '@renderer/store/slices/lang.slice'
import { GrLanguage } from 'react-icons/gr'

export default function SelectLanguage(): JSX.Element {
  const { lng: Language } = useTranslate();

  const dispatcher = useAppDispatch()

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
    <div className="self-start cursor-pointer  border rounded-md py-1 px-2 mb-4 flex items-center font-poppins space-x-1 text-gray-500 hover:text-gray-700">
      <GrLanguage className="text-gray-500" />

      <select
        className="border p-1 absolute top-10 right-0 bg-white rounded-lg shadow-md  mt-2 z-50"
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
