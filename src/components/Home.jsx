import React, { useState, useEffect } from "react";
import { MdOutlineUnarchive, MdOutlineArchive } from "react-icons/md";
import Card from "./Card";

import { getActivities, updateActivityStatus } from "../api";

const Home = ({ selected }) => {
  const [status, setStatus] = useState();
  const [id, setId] = useState(null);
  const [ui, setUi] = useState(true);
  const [archived, setArchived] = useState([]);
  const [unArchived, setUnArchived] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    (async () => {
      const stats = {
        is_archived: status,
      };
      if (id) {
        const res = await updateActivityStatus(id, stats);
        if (res) {
          // only to give alert if call updated successfully
          // alert("Call Updated!!!");
          setUi(!ui);
        }
      }
    })();
  }, [status, id]);

  useEffect(() => {
    (async () => {
      let data = await getActivities();
      data = data.data;
      let archivedData = [];
      let unArchivedData = [];
      data.map((d) => {
        if (d.is_archived && d.from) {
          archivedData.push(d);
        } else if (d.from) {
          unArchivedData.push(d);
        }
      });

      const groupedCallsArchived = archivedData.reduce((acc, call) => {
        let date = call.created_at.slice(0, 10);
        date = formatDate(date);
        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(call);

        return acc;
      }, {});

      setArchived(groupedCallsArchived);
      const groupedCallsUnArchived = unArchivedData.reduce((acc, call) => {
        let date = call.created_at.slice(0, 10);
        date = formatDate(date);
        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(call);

        return acc;
      }, {});
      setUnArchived(groupedCallsUnArchived);
    })();
  }, [ui]);

  const handleAll = () => {
    if (selected === "Inbox") {
      Object.entries(unArchived).map(([date, activityArray]) => {
        activityArray.map(async (data) => {
          await updateActivityStatus(data.id, {
            is_archived: !data.is_archived,
          });
          setUi(!ui);
        });
      });
    } else {
      Object.entries(archived).map(([date, activityArray]) => {
        activityArray.map(async (data) => {
          await updateActivityStatus(data.id, {
            is_archived: !data.is_archived,
          });
          setUi(!ui);
        });
      });
    }
  };

  return (
    <div className="absolute overflow-y-scroll h-[500px] w-[340px]">
      <button
        className="flex items-center gap-4 text-start pl-4 border-2 rounded-2xl w-full h-16 hover:text-red-600"
        onClick={handleAll}
      >
        {selected === "Inbox" ? (
          <>
            <MdOutlineArchive size={25} />
            <span className="font-bold text-lg"> Archive all Calls </span>
          </>
        ) : (
          <>
            <MdOutlineUnarchive size={25} />
            <span className="font-bold text-lg"> Unarchive all Calls </span>
          </>
        )}
      </button>

      {selected === "Inbox"
        ? Object.entries(unArchived).map(([date, activityArray]) => (
            <div key={date}>
              <span className="text-center font-bold text-gray-400">
                {" "}
                ------------------{" "}
              </span>
              <span className="text-gray-600 font-bold"> {date} </span>
              <span className="text-gray-400 font-bold">
                {" "}
                ------------------{" "}
              </span>
              {activityArray.map((act, idx) => (
                <div className="flex-col pb-2" key={idx}>
                  <Card
                    data={act}
                    setId={setId}
                    status={status}
                    setStatus={setStatus}
                  />
                </div>
              ))}
            </div>
          ))
        : Object.entries(archived).map(([date, activityArray]) => (
            <div key={date}>
              <span className="text-center font-bold text-gray-400">
                {" "}
                ------------------{" "}
              </span>
              <span className="text-gray-600 font-bold"> {date} </span>
              <span className="text-gray-400 font-bold">
                {" "}
                ------------------{" "}
              </span>
              {activityArray.map((act, idx) => (
                <div className="flex-col pb-2" key={idx}>
                  <Card
                    data={act}
                    setId={setId}
                    status={status}
                    setStatus={setStatus}
                  />
                </div>
              ))}
            </div>
          ))}
    </div>
  );
};

export default Home;
