import { useEffect, useState } from "react";

const STORAGE_KEY = "schoolMessages";
const UPDATE_EVENT = "school-messages-updated";
const defaultNotifications = [
  {
    id: "announcement-closure",
    type: "announcement",
    category: "events",
    title: "Emergency School Closure",
    message: "The school will be closed today. Please check for further updates.",
    createdAt: "2026-08-15T16:00:00.000Z",
    read: true,
  },
  {
    id: "announcement-clubs",
    type: "announcement",
    category: "academics",
    title: "New Extracurricular Clubs",
    message: "Registration is open for the new extracurricular clubs.",
    createdAt: "2026-08-15T15:30:00.000Z",
    read: true,
  },
];

export const readMessages = () => {
  if (typeof window === "undefined") return [];

  try {
    const storedMessages = window.localStorage.getItem(STORAGE_KEY);
    const messages = storedMessages ? JSON.parse(storedMessages) : [];
    return Array.isArray(messages) ? messages : [];
  } catch {
    return [];
  }
};

const readNotificationFeed = () =>
  [...readMessages(), ...defaultNotifications].sort(
    (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
  );

const writeMessages = (messages) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

export const saveMessage = (messageData) => {
  const message = {
    ...messageData,
    type: messageData.type ?? "contact",
    id: globalThis.crypto?.randomUUID?.() ?? `message-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  writeMessages([message, ...readMessages()]);
  return message;
};

export const saveActivity = (title, message) =>
  saveMessage({ type: "activity", title, message });

export const dismissMessage = (messageId) => {
  const remainingMessages = readMessages().filter((message) => message.id !== messageId);
  if (remainingMessages.length === readMessages().length) return;
  writeMessages(remainingMessages);
};

export const markAllMessagesRead = () => {
  const messages = readMessages();
  if (!messages.some((message) => !message.read)) return;
  writeMessages(messages.map((message) => ({ ...message, read: true })));
};

export const useMessages = () => {
  const [messages, setMessages] = useState(readNotificationFeed);

  useEffect(() => {
    const syncMessages = () => setMessages(readNotificationFeed());
    window.addEventListener("storage", syncMessages);
    window.addEventListener(UPDATE_EVENT, syncMessages);
    return () => {
      window.removeEventListener("storage", syncMessages);
      window.removeEventListener(UPDATE_EVENT, syncMessages);
    };
  }, []);

  return { messages };
};