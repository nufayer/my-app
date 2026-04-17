"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import {
  getTimelineEntries,
  subscribeToTimelineUpdates,
  timelineTypes,
} from "@/lib/timelineStorage";

const chartColors = {
  text: "#7c3aed",
  call: "#1f5d4c",
  video: "#33a867",
};

function getChartData(entries) {
  const counts = {
    text: 0,
    call: 0,
    video: 0,
  };

  entries.forEach((entry) => {
    if (counts[entry.type] !== undefined) {
      counts[entry.type] += 1;
    }
  });

  return [
    {
      name: timelineTypes.text,
      value: counts.text,
      fill: chartColors.text,
      key: "text",
    },
    {
      name: timelineTypes.call,
      value: counts.call,
      fill: chartColors.call,
      key: "call",
    },
    {
      name: timelineTypes.video,
      value: counts.video,
      fill: chartColors.video,
      key: "video",
    },
  ];
}

export default function Stats() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    function refreshStats() {
      setEntries(getTimelineEntries());
    }

    refreshStats();
    return subscribeToTimelineUpdates(refreshStats);
  }, []);

  const chartData = getChartData(entries);
  const totalInteractions = chartData.reduce((sum, item) => sum + item.value, 0);
  const hasData = totalInteractions > 0;

  return (
    <section className="min-h-screen bg-[#f4f7fb] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold tracking-tight text-slate-800">
          Friendship Analytics
        </h1>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm md:px-8 md:py-8">
          <p className="text-lg font-medium text-[#2a5a4b]">
            By Interaction Type
          </p>

          <div className="flex min-h-[420px] flex-col items-center justify-center">
            {hasData ? (
              <>
                <PieChart
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    maxHeight: "60vh",
                    aspectRatio: 1,
                  }}
                  responsive
                >
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius="68%"
                    outerRadius="100%"
                    cornerRadius="50%"
                    paddingAngle={6}
                    stroke="none"
                    isAnimationActive
                  />
                </PieChart>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                  {chartData.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex h-full w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                <p className="text-lg font-medium text-slate-700">
                  No interaction history yet
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Use Call, Text, or Video in a friend profile to generate stats
                  for this chart.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
