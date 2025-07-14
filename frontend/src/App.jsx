import React, { useState } from "react";
import UserList from "./components/UserList";
import Leaderboard from "./components/Leaderboard";
import HistoryList from "./components/HistoryList";

function App() {

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="min-h-screen flex flex-col p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl text-slate-300 font-bold mb-6 text-center">
          Rating System
        </h1>
        <UserList/>
        <Leaderboard />
        <HistoryList />
      </div>
    </div>
  );
}

export default App;
