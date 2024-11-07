import React from 'react'

interface EnableButtonProps {
  onClick: () => void
  value: boolean
}

const EnableButton: React.FC<EnableButtonProps> = ({ onClick, value }) => {
  return (
    <input
      dir='ltr'
      className="cursor-pointer ltr:ml-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] 
                    bg-gray-300/100 before:absolute before:h-3.5 before:w-3.5 before:rounded-full
                    before:bg-blue-300 before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem]
                    after:h-5 after:w-5 after:rounded-full after:border-none after:bg-gray-500/90
                    after:transition-[background-color_0.2s,transform_0.2s]  after:content-['']
                    checked:bg-blue-300 checked:after:ml-[1.0625rem]  checked:after:bg-blue-600"
      type="checkbox"
      role="switch"
      id="flexSwitchChecked"
      defaultChecked={value}
      onClick={onClick}
    />
  )
}

export default EnableButton
