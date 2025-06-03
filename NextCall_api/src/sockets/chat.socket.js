const ChatService = require('../services/chat.service');

const registerChatSocket = (io, socket) => {
    // Register user
    socket.on("register", (username) => {
        const users = ChatService.addUser(socket.id, username);
        console.log(`${username} connected with socket ID ${socket.id}`);
        
        // Send updated user list and group list to all clients
        io.emit("userList", users);
        io.emit("groupList", ChatService.getAllGroups());
    });

    // Handle private message
    socket.on("private message", ({ to, message }) => {
        const fromUser = ChatService.users[socket.id];
        if (fromUser && to && ChatService.users[to]) {
            io.to(to).emit("private message", {
                from: fromUser.username,
                message,
            });
        }
    });

    // Create group
    socket.on("create group", (groupName) => {
        const group = ChatService.createGroup(groupName, socket.id);
        io.emit("groupList", ChatService.getAllGroups());
        socket.join(group.id);
    });

    // Join group
    socket.on("join group", (groupId) => {
        if (ChatService.joinGroup(groupId, socket.id)) {
            socket.join(groupId);
            const username = ChatService.users[socket.id]?.username;
            io.to(groupId).emit("group message", {
                type: "system",
                message: `${username} joined the group`
            });
            io.emit("groupList", ChatService.getAllGroups());
        }
    });

    // Leave group
    socket.on("leave group", (groupId) => {
        if (ChatService.leaveGroup(groupId, socket.id)) {
            socket.leave(groupId);
            const username = ChatService.users[socket.id]?.username;
            io.to(groupId).emit("group message", {
                type: "system",
                message: `${username} left the group`
            });
            io.emit("groupList", ChatService.getAllGroups());
        }
    });

    // Group message
    socket.on("group message", ({ groupId, message }) => {
        const fromUser = ChatService.users[socket.id];
        if (fromUser && ChatService.getGroupMembers(groupId).includes(socket.id)) {
            const messageObj = {
                type: "message",
                from: fromUser.username,
                message,
                timestamp: new Date()
            };
            ChatService.addMessageToGroup(groupId, messageObj);
            io.to(groupId).emit("group message", messageObj);
        }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        const users = ChatService.removeUser(socket.id);
        io.emit("userList", users);
        io.emit("groupList", ChatService.getAllGroups());
    });
};

module.exports = registerChatSocket; 