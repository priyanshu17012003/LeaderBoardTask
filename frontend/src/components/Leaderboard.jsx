import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Crown,Gift } from "lucide-react";
import Hero from "./Hero";

const socket = io("http://localhost:5000");

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("get-users");
    socket.on("users-fetched", setUsers);
    socket.on("points-claimed", setUsers);
    socket.on("user-added", setUsers);

    return () => {
      socket.off("users-fetched");
      socket.off("points-claimed");
      socket.off("user-added");
    };
  }, []);

  const handleClaim = (id) => {
    socket.emit("claim-points", { userid: id });
  };

  return (
    <div className="mt-6 overflow-x-auto">

      <Hero users={users} />

      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        <Crown className="w-5 h-5 text-amber-400" />
        <span className="text-amber-400">Leaderboard</span>
      </h2>
      <div className="overflow-x-auto border border-base-content/5">
      <table className="table w-full border-2 border-slate-500">
        <thead>
          <tr className="bg-slate-800">
            <th className="text-slate-300">Rank</th>
            <th className="text-slate-300">User</th>
            <th className="text-slate-300">Total Points</th>
            <th className="text-slate-300">Claim Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id} className={idx % 2 === 0 ? "bg-slate-700" : ""}>
              <td className="text-slate-300">{idx + 1}</td>
              <td className="text-slate-300">{user.name}</td>
              <td className="text-slate-300">{user.totalPoints}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleClaim(user._id)}
                >
                 <Gift className="w-4 h-4" /> Claim Points
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Leaderboard;
