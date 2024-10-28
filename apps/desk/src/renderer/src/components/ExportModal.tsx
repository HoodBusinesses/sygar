import React, { FC } from "react";

interface DeleteModalProps {
  onClose: () => void;
}

const ExportModal: FC<DeleteModalProps> = ({ onClose }) => {
  const handleExport = () => {
    console.log("Export");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center backdrop-brightness-75 justify-center bg-black bg-opacity-50">
      <div className=" bg-white p-4 items-center justify-center rounded-md shadow-md w-1/2">
        <div className="p-4">
          <h2 className="text-xl text-gray-800  font-bold mb-4">Export Organizations</h2>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            natus
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="custom-button bg-blue-500 hover:bg-blue-800"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
