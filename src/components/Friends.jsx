"use client";

import React, { useEffect, useState } from "react";

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => setFriends(data));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Your Friends</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="bg-white rounded-2xl shadow-md p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={friend.picture}
                alt={friend.name}
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              {friend.name}
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              {friend.days_since_contact}d ago
            </p>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {friend.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full"
                >
                  {tag}
                </span>
              ))}

              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  friend.status === "overdue"
                    ? "bg-orange-100 text-orange-600"
                    : friend.status === "inactive"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {friend.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;