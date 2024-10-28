import React, { useState, useRef, useEffect } from 'react'
import { ArrowDownIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useTranslate } from '@renderer/hooks/useTranslate';

const SortByPopover = ({ onSort }) => {
  const { t } = useTranslate()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('asc')
  const [creationDate, setCreationDate] = useState('asc')
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

  const handleApply = (): void => {
    console.log({ email, creationDate })

    if (email) {
      onSort({ field: 'email', direction: email })
    }
    if (creationDate) {
      onSort({ field: 'createdDate', direction: creationDate })
    }
    setIsOpen(false)
  }
  
  const handleReset = (): void => {
    setEmail('')
    setCreationDate('')
    onSort(null)
  };

  return (
    <div className="relative" ref={popoverRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
      >
        <ArrowDownIcon className="h-5 w-5" />
        {t('buttons.sortBy')}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 space-y-4 text-gray-700">
          <h4 className="font-medium mb-3">{t('buttons.sortBy')}</h4>

            <div>
              <h4 className="font-medium mb-3">Email</h4>
              <div className="space-y-2 ">
                <label className="flex items-center  space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortEmail"
                    value="asc"
                    checked={email === 'asc'}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>A_Z</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortEmail"
                    value="desc"
                    checked={email === 'desc'}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Z_A</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Created Date</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortCreationDate"
                    value="asc"
                    checked={creationDate === 'asc'}
                    onChange={(e) => setCreationDate(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Ascending</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortCreationDate"
                    value="desc"
                    checked={creationDate === 'desc'}
                    onChange={(e) => setCreationDate(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Descending</span>
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
  );
};

export default SortByPopover;