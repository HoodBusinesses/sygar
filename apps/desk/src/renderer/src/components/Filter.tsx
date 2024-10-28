import { ArrowDownIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslate } from '@renderer/hooks/useTranslate'
import SortOption from './ui/sort-options'
import { Button } from './ui/button'

const Filter = (OnFilter): JSX.Element => {
  const { t } = useTranslate()
  const [isOpen, setIsOpen] = useState(false)
  const [enabled, setEnabled] = useState<string>('true')
  const popoverRef = useRef(null)

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

            <SortOption
              title="Enabled"
              name="Filter"
              value={enabled}
              checkedValue={enabled}
              onChange={setEnabled}
              labels={{ true: 'true', false: 'false' }}
            />

            <div className="flex justify-between pt-4 border-t">
              <Button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50"
              >
                Reset all
              </Button>
              <Button
                onClick={handleApply}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
