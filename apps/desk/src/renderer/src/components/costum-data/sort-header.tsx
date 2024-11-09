import { useTranslate } from '@renderer/hooks/useTranslate'
import { BiSort } from 'react-icons/bi'
import { RxReset } from "react-icons/rx";

type Props = {
  OnClick: () => void
  label: string
  isSomeSortSeted: boolean
  resetFn: () => void
}
export default function SortHeader({OnClick, label, resetFn, isSomeSortSeted}: Props) {
  const {t} = useTranslate();
  
  return (
    <div className="w-full flex gap-2 items-center justify-center">
      <button
        className="flex px-4 w-fit items-center justify-center gap-1 text-gray-600 font-semibold border border-white py-1  hover:border-gray-300 rounded-lg rtl:flex-row-reverse"
        onClick={OnClick}
      >
        {t(label)}
        <BiSort className="text-black w-4 h-4" />
      </button>
      {isSomeSortSeted && (
        <RxReset
          onClick={resetFn}
          className="text-black w-4 h-4 cursor-pointer border border-white hover:border-gray-300 rounded-full"
        />
      )}
    </div>
  )
}
