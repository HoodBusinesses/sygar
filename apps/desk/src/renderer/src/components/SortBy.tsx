import { useTranslate } from '@renderer/hooks/useTranslate';
import { ArrowDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import SortOption from './ui/sort-options';

const SortByPopover = ({ onSort }) => {
  const { t } = useTranslate();
  const [email, setEmail] = useState('asc');
  const [creationDate, setCreationDate] = useState('asc');

  const handleApply = (): void => {
    console.log({ email, creationDate });

    if (email) {
      onSort([{ id: 'email', desc: email === 'desc' }]);
    }
    // if (creationDate) {
    //   onSort([{ id: 'createdDate', desc: creationDate === 'desc' }])
    // }
  };

  const handleReset = (): void => {
    setEmail('');
    setCreationDate('');
    onSort(null);
  };

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
        <ArrowDownIcon className="h-5 w-5" />
        {t('buttons.sortBy')}
      </PopoverTrigger>

      <PopoverContent className="p-4 space-y-4 text-gray-700 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
        <h4 className="font-medium mb-3">{t('buttons.sortBy')}</h4>

        <SortOption
          title="Email"
          name="sortEmail"
          value={email}
          checkedValue={email}
          onChange={setEmail}
          labels={{ asc: 'A_Z', desc: 'Z_A' }}
        />

        <SortOption
          title="Created Date"
          name="sortCreationDate"
          value={creationDate}
          checkedValue={creationDate}
          onChange={setCreationDate}
          labels={{ asc: 'Ascending', desc: 'Descending' }}
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

export default SortByPopover;
