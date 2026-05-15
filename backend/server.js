import app from "./src/app.js";
import db from "./src/db/db.js";
import { initSocket } from "./src/socket/socket.js";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

db();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH"],
  },
});

initSocket(io);

io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket Disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
