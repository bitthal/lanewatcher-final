// components/Toaster.js
import React from 'react';
import { MdClose } from 'react-icons/md';

const Toaster = ({ message, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 bg-red-500 text-white rounded-md flex justify-between items-center transition-opacity ${
        message ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <span>{message}</span>
      {message && (
        <button onClick={onClose}>
          <MdClose size={20} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default Toaster;
