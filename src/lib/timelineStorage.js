const TIMELINE_STORAGE_KEY = "keenkeeper-timeline-history";
const TIMELINE_UPDATED_EVENT = "keenkeeper:timeline-updated";

export const timelineTypes = {
  call: "Call",
  text: "Text",
  video: "Video",
};

export function getTimelineEntries() {
  if (typeof window === "undefined") {
    return [];
  }

  const rawEntries = window.localStorage.getItem(TIMELINE_STORAGE_KEY);

  if (!rawEntries) {
    return [];
  }

  try {
    const entries = JSON.parse(rawEntries);
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

export function addTimelineEntry({ type, friendName }) {
  if (typeof window === "undefined") {
    return [];
  }

  const nextEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    friendName,
    createdAt: new Date().toISOString(),
  };

  const updatedEntries = [nextEntry, ...getTimelineEntries()];
  window.localStorage.setItem(
    TIMELINE_STORAGE_KEY,
    JSON.stringify(updatedEntries)
  );
  window.dispatchEvent(new CustomEvent(TIMELINE_UPDATED_EVENT));

  return updatedEntries;
}

export function subscribeToTimelineUpdates(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener(TIMELINE_UPDATED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(TIMELINE_UPDATED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
