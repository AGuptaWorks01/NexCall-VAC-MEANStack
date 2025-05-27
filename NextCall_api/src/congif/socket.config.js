const { Server } = require("socket.io");
const registerCallSocket = require("../sockets/call.socket");

function setupSocket (server) {
    const io = new Server(server, {
        cors: {
            origin: "*", // Update if needed for security
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        registerCallSocket(io, socket); // delegate to handler

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
}

module.exports = { setupSocket };
