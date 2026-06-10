import { io } from "socket.io-client";

export const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("Conectado:", socket.id);
});

socket.on("notification", (data) => {
  console.log("Nueva notificación:", data);
});
