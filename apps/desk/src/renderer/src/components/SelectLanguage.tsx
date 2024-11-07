import { useTranslate } from '@renderer/hooks/useTranslate'
import { useAppDispatch } from '@renderer/store/hooks'
import { changeLang, LangPayloadType, langs } from '@renderer/store/slices/lang.slice'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export default function SelectLanguage(): JSX.Element {
  const { lng } = useTranslate()
  const dispatcher = useAppDispatch()

  const changeLanguage = (lngPayload: LangPayloadType): void => {
    dispatcher(changeLang(lngPayload))
  }

  return (
    <Popover>
      {/* Popover Trigger */}
      <PopoverTrigger className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-gray-800">
        <span className="text-sm">{lng.name}</span>
        <HiOutlineChevronDown className="text-xs text-gray-500" />
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent className="bg-white rounded-lg shadow-md border mt-3 p-2 w-36">
        {langs.map((option, idx) => (
          <div
            key={idx}
            className={`flex items-center p-2 cursor-pointer rounded-md hover:bg-gray-100 ${
              option.id === lng.id ? 'font-semibold text-gray-800' : 'text-gray-600'
            }`}
            onClick={() => changeLanguage(option)}
          >
            {/* Selection Indicator */}
            <span
              className={`h-4 w-4 rounded-full border mr-3 flex items-center justify-center ${
                option.id === lng.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}
            >
              {option.id === lng.id && <span className="h-2 w-2 bg-white rounded-full"></span>}
            </span>
            <span className="text-sm">{option.name}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
