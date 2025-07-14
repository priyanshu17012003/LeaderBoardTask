import React from "react";
import { Medal, Star } from "lucide-react";

const rankColors = ["text-yellow-400", "text-gray-400", "text-orange-500"];
const bgColors = ["bg-yellow-100", "bg-gray-100", "bg-orange-100"];
const medals = ["🥇", "🥈", "🥉"];

const Hero = ({ users = [] }) => {
  const topThree = users.slice(0, 3);

  return (
    <div className="hero bg-base-200 p-6 rounded-xl shadow-md mb-6">
      <div className="hero-content flex-col text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-4">
          <Star className="w-6 h-6 text-yellow-400" />
          Top Performers
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {topThree.map((user, index) => (
            <div
              key={user._id}
              className={`card w-52 ${bgColors[index]} shadow-lg p-4`}
            >
              <div className="text-4xl">{medals[index]}</div>
              <div className={`text-lg font-semibold mt-2 ${rankColors[index]}`}>
                {user.name}
              </div>
              <div className="text-sm text-gray-600">Points: {user.totalPoints}</div>
              <div className="badge badge-outline mt-2">Rank #{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
