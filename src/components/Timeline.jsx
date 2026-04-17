"use client";

import { useEffect, useState } from "react";
import {
  getTimelineEntries,
  subscribeToTimelineUpdates,
  timelineTypes,
} from "@/lib/timelineStorage";

function formatTimelineDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function getEntryIcon(type) {
  if (type === "call") {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5 text-slate-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.36 2.57a2 2 0 0 1-.57 1.73l-1.2 1.2a16 16 0 0 0 7.1 7.1l1.2-1.2a2 2 0 0 1 1.73-.57l2.57.36A2 2 0 0 1 22 16.92Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "video") {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5 text-slate-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M15 10.5 21 7v10l-6-3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          width="12"
          height="10"
          x="3"
          y="7"
          rx="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-slate-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 10h8M8 14h5m-7 6h12a2 2 0 0 0 2-2V8l-4-4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getIconWrapperClass(type) {
  if (type === "call") {
    return "bg-slate-100";
  }

  if (type === "video") {
    return "bg-indigo-100";
  }

  return "bg-amber-100";
}

export default function Timeline() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    function refreshTimeline() {
      setEntries(getTimelineEntries());
    }

    refreshTimeline();
    return subscribeToTimelineUpdates(refreshTimeline);
  }, []);

  const filteredEntries = entries.filter((entry) => {
    if (filter === "all") {
      return true;
    }

    return entry.type === filter;
  });

  return (
    <section className="min-h-screen bg-[#f4f7fb] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold tracking-tight text-slate-800">
          Timeline
        </h1>

        <div className="mt-6 max-w-sm">
          <label className="sr-only" htmlFor="timeline-filter">
            Filter timeline
          </label>
          <div className="relative">
            <select
              id="timeline-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-500 shadow-sm outline-none transition focus:border-[#285943]"
            >
              <option value="all">Filter timeline</option>
              <option value="call">Calls</option>
              <option value="text">Texts</option>
              <option value="video">Video calls</option>
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="m6 9 6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-500 shadow-sm">
              No timeline history yet. Use the Call, Text, or Video buttons on a
              friend profile to add entries here.
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <article
                key={entry.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${getIconWrapperClass(
                    entry.type
                  )}`}
                >
                  {getEntryIcon(entry.type)}
                </div>

                <div>
                  <p className="text-base leading-tight text-slate-800">
                    <span className="font-semibold text-[#285943]">
                      {timelineTypes[entry.type]}
                    </span>{" "}
                    <span className="text-slate-500">with</span>{" "}
                    <span className="font-medium">{entry.friendName}</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {formatTimelineDate(entry.createdAt)}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
