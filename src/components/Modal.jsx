import React from "react";

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <tbody>
              <tr>
                <td className="px-4 py-2 bg-gray-200 border border-gray-400">
                  Call ID
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                  {data.id}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 bg-gray-200 border border-gray-400">
                  {" "}
                  Call Type{" "}
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                  {capitalizeFirstLetter(data.call_type)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 bg-gray-200 border border-gray-400">
                  Direction
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                  {capitalizeFirstLetter(data.direction)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 bg-gray-200 border border-gray-400">
                  From
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                  {data.from}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 bg-gray-200 border border-gray-400">
                  To
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                  {data.to}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 bg-gray-200 border border-gray-400">
                  Via
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                  {data.via}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 bg-gray-200 border border-gray-400">
                  Archived
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                  {data.is_archived ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
