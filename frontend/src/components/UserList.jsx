import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { UserPlus } from "lucide-react";

const socket = io("http://localhost:5000");

const UserList = () => {
  const [name, setName] = useState("");

  const addUser = () => {
    if (name.trim()) {
      socket.emit("add-user", { name });
      setName("");
    }
  };

  return (
    <div className="flex flex-col gap-4">

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter user name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-success" onClick={addUser}>
          <UserPlus className="w-4 h-4" /> Add
        </button>
      </div>
    </div>
  );
};

export default UserList;
