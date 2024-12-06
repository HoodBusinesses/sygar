import { FaSpinner } from 'react-icons/fa';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <FaSpinner className="animate-spin" size={80} />
    </div>
  );
};