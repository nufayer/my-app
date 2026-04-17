"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function getStatusClasses(status) {
  if (status === "overdue") {
    return "bg-red-100 text-red-600";
  }

  if (status === "inactive") {
    return "bg-gray-200 text-gray-700";
  }

  return "bg-blue-100 text-blue-700";
}

export default function FriendProfile({ friendId }) {
  const [friend, setFriend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFriend() {
      const res = await fetch("/friends.json");
      const data = await res.json();
      const selectedFriend = data.find(
        (item) => String(item.id) === String(friendId)
      );

      setFriend(selectedFriend || null);
      setIsLoading(false);
    }

    loadFriend();
  }, [friendId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-8">
          <p className="text-gray-500">Loading friend details...</p>
        </div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-8">
          <p className="text-lg font-semibold text-gray-800">Friend not found.</p>
          <Link href="/" className="inline-block mt-4 text-blue-600 hover:underline">
            Back to friends list
          </Link>
        </div>
      </div>
    );
  }

  const handleCall = () => alert(`Calling ${friend.name}`);
  const handleText = () => alert(`Texting ${friend.name}`);
  const handleVideo = () => alert(`Video calling ${friend.name}`);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
          <h2 className="text-lg font-semibold text-gray-800">{friend.name}</h2>

          <span
            className={`mt-2 text-xs px-3 py-1 rounded-full ${getStatusClasses(
              friend.status
            )}`}
          >
            {friend.status}
          </span>

          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {friend.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-4 text-sm italic text-gray-500">{friend.bio}</p>
          <p className="text-xs text-gray-400 mt-2">{friend.email}</p>

          <div className="w-full mt-6 space-y-2">
            <button className="w-full border rounded-lg py-2 text-sm hover:bg-gray-50">
              Snooze 2 Weeks
            </button>
            <button className="w-full border rounded-lg py-2 text-sm hover:bg-gray-50">
              Archive
            </button>
            <button className="w-full border rounded-lg py-2 text-sm text-red-600 hover:bg-red-50">
              Delete
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <p className="text-2xl font-semibold text-gray-800">
                {friend.days_since_contact}
              </p>
              <p className="text-sm text-gray-500">Days Since Contact</p>
            </div>

            <div className="bg-white rounded-xl shadow p-10 text-center">
              <p className="text-2xl font-semibold text-gray-800">{friend.goal}</p>
              <p className="text-sm text-gray-500">Goal (Days)</p>
            </div>

            <div className="bg-white rounded-xl shadow p-10 text-center">
              <p className="text-lg font-semibold text-gray-800">
                {formatDate(friend.next_due_date)}
              </p>
              <p className="text-sm text-gray-500">Next Due</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Relationship Goal</p>
              <p className="font-medium text-gray-800">
                Connect every <span className="font-semibold">{friend.goal} days</span>
              </p>
            </div>
            <button className="text-sm border px-3 py-1 rounded-md hover:bg-gray-50">
              Edit
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500 mb-4">Quick Check-In</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={handleCall}
                className="border rounded-xl py-6 flex flex-col items-center hover:bg-gray-50"
              >
                <span className="text-xl">Call</span>
                <span className="mt-2 text-sm">Call</span>
              </button>

              <button
                onClick={handleText}
                className="border rounded-xl py-6 flex flex-col items-center hover:bg-gray-50"
              >
                <span className="text-xl">Text</span>
                <span className="mt-2 text-sm">Text</span>
              </button>

              <button
                onClick={handleVideo}
                className="border rounded-xl py-6 flex flex-col items-center hover:bg-gray-50"
              >
                <span className="text-xl">Video</span>
                <span className="mt-2 text-sm">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
