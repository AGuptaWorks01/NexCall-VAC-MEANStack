require('dotenv').config(); // Load environment variables from .env file

const http = require("http");
const app = require("./app")
const { setupSocket } = require("./congif/socket.config")
const connectToMongo = require("./congif/db.config");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app)

// MongoDB Connection
connectToMongo();

// WebSocket Setup
setupSocket(server)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});