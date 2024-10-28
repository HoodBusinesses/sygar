import { ArrowDownIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslate } from '@renderer/hooks/useTranslate'

const Filter = (OnFilter): JSX.Element => {
  const { t } = useTranslate()
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleReset = (): void => {
    OnFilter(null)
  }

  const handleApply = (): void => {
    console.log('Filter applied')
  }


  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
      >
        <ArrowDownIcon className="h-5 w-5" />
        {t('buttons.filter')}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 space-y-4 text-gray-700">
          <h4 className="font-medium mb-3">{t('buttons.filter')}</h4>

            <div>
              <h4 className="font-medium mb-3">Enabled</h4>
              <div className="space-y-2 ">
                <label className="flex items-center  space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="Filter"
                    value="true"
                    // checked={email === 'asc'}
                    // onChange={(e) => setEmail(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>true</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="Filter"
                    value="false"
                    // checked={email === 'desc'}
                    // onChange={(e) => setEmail(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>false</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50"
              >
                Reset all
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
