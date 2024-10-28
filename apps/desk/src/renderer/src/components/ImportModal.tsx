
import React, { FC } from "react";

interface DeleteModalProps {
  onClose: () => void;
}

const ImportModal: FC<DeleteModalProps> = ({ onClose }) => {
  const handleEImport = () => {
    console.log("Import");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center backdrop-brightness-75 justify-center bg-black p-5 bg-opacity-50">
      <div className=" bg-white p-4 items-center justify-center rounded-md shadow-md w-1/2">
        <div className="p-4">
          <h2 className="text-xl text-gray-800  font-bold mb-4">
            Document upload
          </h2>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            natus
          </p>
        </div>
        <div className="flex items-center justify-center p-5">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <p className="text-gray-400 ">Only .xml Files</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleEImport}
            className="custom-button bg-blue-500 hover:bg-blue-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
