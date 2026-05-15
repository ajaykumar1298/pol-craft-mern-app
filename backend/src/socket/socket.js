let io;

export const initSocket = (server) => {
  io = server;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized yet");
  return io;
};
