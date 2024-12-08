import { CgSpinner } from 'react-icons/cg';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <CgSpinner className="animate-spin text-blue-600" size={80} />
    </div>
  );
};