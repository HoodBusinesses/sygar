import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Import Heroicons X for close button

const ConfirmationModal = ({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
}: {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold  text-gray-700">{title}</h2>{" "}
          {/* Black title */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Keep Editing
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
