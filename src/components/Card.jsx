import React, { useState } from "react";
import { SlCallEnd, SlCallIn, SlCallOut } from "react-icons/sl";
import Modal from "./Modal";

import { getActivityDetail } from "../api";

const Card = ({ data, setStatus, setId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ activityData, setActivityData] = useState();

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  }

  const time = formatTime(data.created_at);
  const handleClick = (e) => {
    e.stopPropagation()
    setIsModalOpen(false);
    setStatus(!data.is_archived);
    setId(data.id);
    
  };

  const handleOpenModal = () => {
    ;(async () => {
      const response = await getActivityDetail(data.id);
      if(response) {
        setActivityData(response.data);
        setIsModalOpen(true);
      }
    })()
    
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className="" onClick={handleOpenModal}>
      <button className="flex-row items-center gap-4 text-start pl-4 pr-4 border-2 rounded-2xl w-full h-16">
        {/* can be done using data.direction.map also */}
        {data.direction === "outbound" ? (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <SlCallOut size={20} />
              <span className="font-bold text-gray-900"> {data.from} </span>
            </div>
            <div className="flex">
              <button
                className="hover:text-white hover:bg-red-500 mr-2 border p-[0.1rem]"
                onClick={handleClick}
              >
                {" "}
                {!data.is_archived ? "Archive" : "Unarchive"}{" "}
              </button>
              <span className="font-bold text-gray-400"> {time} </span>
            </div>
          </div>
        ) : data.direction === "inbound" ? (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <SlCallIn size={20} />
              <span className="font-bold text-gray-900"> {data.from} </span>
            </div>
            <div className="flex">
              <button
                className="hover:text-white hover:bg-red-500 mr-2 border p-[0.1rem]"
                onClick={handleClick}
              >
                {" "}
                {!data.is_archived ? "Archive" : "Unarchive"}{" "}
              </button>
              <span className="font-bold text-gray-400"> {time} </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <SlCallEnd size={20} />
              <span className="font-bold text-gray-900"> {data.from} </span>
            </div>
            <div className="flex">
              <button
                className="hover:text-white hover:bg-red-500 mr-2 border p-[0.1rem]"
                onClick={handleClick}
              >
                {" "}
                {!data.is_archived ? "Archive" : "Unarchive"}{" "}
              </button>{" "}
              <span className="font-bold text-gray-400"> {time} </span>
            </div>
          </div>
        )}
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} data={activityData} />
    </div>
  );
};

export default Card;
