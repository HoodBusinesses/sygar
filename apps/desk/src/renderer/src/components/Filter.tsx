import { useTranslate } from '@renderer/hooks/useTranslate';
import { ArrowDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import SortOption from './ui/sort-options';

const Filter = ({ OnFilter }): JSX.Element => {
  const { t } = useTranslate();

  const [enabled, setEnabled] = useState<string>('true');

  const handleReset = (): void => {
    OnFilter(null);
  };

  const handleApply = (): void => {
    OnFilter([{ id: 'enabled', desc: enabled === 'true' }]);
  };

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
        <ArrowDownIcon className="h-5 w-5" />
        {t('buttons.filter')}
      </PopoverTrigger>

      <PopoverContent className="p-4 space-y-4 text-gray-700 w-80 bg-white rounded-lg shadow-lg border border-gray-200 mr-4">
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
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
