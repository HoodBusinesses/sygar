import React from 'react'

interface SortOptionProps {
  title: string
  name: string
  value: string
  checkedValue: string
  onChange: (value: string) => void
  labels: { asc?: string; desc?: string; true?: string; false?: string }
}

const SortOption: React.FC<SortOptionProps> = ({
  title,
  name,
  value,
  checkedValue,
  onChange,
  labels
}) => {
  return (
    <div>
      <h4 className="font-medium mb-3">{title}</h4>
      <div className="space-y-2">
        {labels.asc && labels.desc && (
          <>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={name}
                value="asc"
                checked={value === 'asc'}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span>{labels.asc}</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={name}
                value="desc"
                checked={value === 'desc'}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span>{labels.desc}</span>
            </label>
          </>
        )}
        {labels.true && labels.false && (
          <>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={name}
                value="true"
                checked={value === 'true'}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span>{labels.true}</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={name}
                value="false"
                checked={value === 'false'}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span>{labels.false}</span>
            </label>
          </>
        )}
      </div>
    </div>
  )
}

export default SortOption
