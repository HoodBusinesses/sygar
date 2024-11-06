import { useTranslate } from '@renderer/hooks/useTranslate'
import { useAppDispatch } from '@renderer/store/hooks'
import { changeLang, LangPayloadType, langs } from '@renderer/store/slices/lang.slice'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Globe } from 'lucide-react';

export default function SelectLanguage(): JSX.Element {
  const { lng } = useTranslate()

  const dispatcher = useAppDispatch()

  const changeLanguage = (lngPayload: LangPayloadType): void => {
    dispatcher(changeLang(lngPayload))
  }
  return (
    <Popover>
      <PopoverTrigger className="flex items-center cursor-pointer space-x-2 border border-gray-500 rounded-md py-2 px-3">
        <span>
          <Globe size={20} color='gray' />
        </span>
        <span className="text-sm text-gray-500">{lng.name}</span>
        <HiOutlineChevronDown className="text-gray-500" />
      </PopoverTrigger>

      <PopoverContent className=" bg-white rounded-lg shadow-md border mt-4 mr-2">
        {langs.map((option, idx) => (
          <div
            key={idx}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
              option.id === lng.id ? 'font-semibold' : ''
            }`}
            onClick={() => changeLanguage(option)}
          >
            <span
              className={`h-4 w-4 rounded-full border border-gray-400 mr-3 flex items-center justify-center ${
                option.id === lng.id ? 'bg-gray-400' : ''
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
