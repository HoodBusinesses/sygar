import React, { FC, useEffect, useRef } from "react";
import { Button } from "./ui/button";

interface DeleteModalProps {
  onClose: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ onClose }) => {

  // const popoverRef = useRef(null)
  
  // Handle click outside to close popover
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     console.log('first')
  //     if (popoverRef.current && !popoverRef.current.contains(event.target)) {
  //       console.log("outside")
        
  //       onClose()
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [])

  const handleDelete = (): void => {
    console.log("delete");
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center backdrop-brightness-75 justify-center bg-black bg-opacity-50">
      <div className=" bg-white p-4 items-center justify-center rounded-md shadow-md w-1/2">
        <div className="p-4">

        <h2 className="text-xl text-gray-800  font-bold mb-4">DELETE Post</h2>
        <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
            Cancel
          </Button>
          <Button onClick={handleDelete} className="custom-button bg-red-500 hover:bg-red-800">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
