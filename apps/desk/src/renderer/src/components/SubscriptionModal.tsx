import React, { FC } from "react";

interface DeleteModalProps {
  onClose: () => void;
}

const SubscriptionModal: FC<DeleteModalProps> = ({ onClose }) => {
  const handleSubscription = () => {
    console.log("Export");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center backdrop-brightness-75 justify-center bg-black bg-opacity-50">
      <div className=" bg-white p-4 items-center justify-center rounded-md shadow-md w-1/2">
        <div className="p-4">
          <h2 className="text-xl text-gray-800  font-bold mb-4">Manage Your Subscription</h2>
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
            onClick={handleSubscription}
            className="custom-button bg-green-500 hover:bg-green-800"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
