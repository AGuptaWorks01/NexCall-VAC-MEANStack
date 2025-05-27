const http = require("http");
const app = require("./app")
const { setupSocket } = require("./congif/socket.config")

const PORT = process.env.PORT || 3000;

const server = http.createServer(app)

setupSocket(server)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});