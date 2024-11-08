import { ChangeEventHandler } from 'react';
import { Input } from '../ui/input';
import { FiSearch } from 'react-icons/fi';

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
};
export default function SearchTableInput({ onChange }: Props) {
  return (
    <div className="relative">
      <Input
        placeholder={''}
        className="pl-10 text-gray-600 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none w-64"
        // value={value}
        onChange={onChange}
      />
      <FiSearch className="absolute top-[0.6rem] left-2 text-gray-400 h-5 w-5" />
    </div>
  );
}
