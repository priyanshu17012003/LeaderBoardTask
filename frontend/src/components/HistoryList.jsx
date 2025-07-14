import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { History } from "lucide-react";

const socket = io("http://localhost:5000");

const HistoryList = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.emit("get-history");
    socket.on("history-fetched", setHistory);
    socket.on("points-claimed", () => socket.emit("get-history"));

    return () => {
      socket.off("history-fetched");
      socket.off("points-claimed");
    };
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3 flex gap-2 items-center">
        <History className="w-5 h-5 text-green-400" />
        <span className="text-green-400">Claim History</span>
      </h2>
      <ul className="space-y-2 max-h-60 overflow-auto">
        {history.map((h) => (
          <li
            key={h._id}
            className="card shadow-md bg-base-100 border border-base-200 p-4 rounded-xl hover:shadow-lg transition duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-primary">
                  {h.userName}
                </h3>
                <p className="text-sm text-gray-500">
                  Claimed{" "}
                  <span className="font-bold text-success">
                    {h.pointsAwarded}
                  </span>{" "}
                  points
                </p>
                <p className="text-sm text-gray-400">
                  Previous: {h.previousPoints} &rarr; New: {h.newPoints}
                </p>
              </div>
              <div className="text-xs text-right text-neutral">
                {h.claimedAt ? new Date(h.claimedAt).toLocaleString() : ""}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
