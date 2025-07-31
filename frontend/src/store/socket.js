import { io } from "socket.io-client";
import { addMsg } from "./chatActions";
import { updateUserChats } from "./userActions";

let socket = null;

export async function initSocket() {
  try {
    // שליחת פינג לשרת לבדוק אם הוא חי
    const res = await fetch("http://localhost:3030/api/ping", { credentials: 'include' });

    if (res.ok) {
      // שרת חי – מתחברים לסוקטים
      socket = io("http://localhost:3030", {
        withCredentials: true,
        transports: ["polling", "websocket"],
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket:", socket.id);
      });

      socket.on("newMsg", function (data) {
        addMsg(data);
      });

      socket.on("addUser", function (id) {
        updateUserChats(id);
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
    } else {
      console.log("Server not ready yet.");
    }
  } catch (err) {
    console.error("Failed to reach server:", err);
  }

  console.log('a')
  return socket;
}

export function listen(userId) {
  if (socket) socket.emit("listen", userId);
}

export function joinChat(chatId) {
  if (socket) socket.emit("chat", chatId);
}

export function socketNewMsg(chatId) {
  if (socket) socket.emit("newMsg", chatId);
}

export function socketAddUser(userId) {
  if (socket) socket.emit("addUser", userId);
}
