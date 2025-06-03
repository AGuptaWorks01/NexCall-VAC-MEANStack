const ChatService = {
    users: {},
    groups: {},

    addUser(socketId, username) {
        this.users[socketId] = { username };
        return this.getAllUsers();
    },

    removeUser(socketId) {
        delete this.users[socketId];
        return this.getAllUsers();
    },

    getAllUsers() {
        return Object.entries(this.users).map(([id, u]) => ({ id, username: u.username }));
    },

    createGroup(groupName, creatorSocketId) {
        const groupId = `group_${Date.now()}`;
        this.groups[groupId] = {
            id: groupId,
            name: groupName,
            members: [creatorSocketId],
            messages: []
        };
        return this.groups[groupId];
    },

    joinGroup(groupId, socketId) {
        if (this.groups[groupId] && !this.groups[groupId].members.includes(socketId)) {
            this.groups[groupId].members.push(socketId);
            return true;
        }
        return false;
    },

    leaveGroup(groupId, socketId) {
        if (this.groups[groupId]) {
            this.groups[groupId].members = this.groups[groupId].members.filter(id => id !== socketId);
            return true;
        }
        return false;
    },

    getAllGroups() {
        return Object.values(this.groups).map(({ id, name, members }) => ({
            id,
            name,
            memberCount: members.length
        }));
    },

    addMessageToGroup(groupId, message) {
        if (this.groups[groupId]) {
            this.groups[groupId].messages.push(message);
            return true;
        }
        return false;
    },

    getGroupMembers(groupId) {
        return this.groups[groupId]?.members || [];
    }
};

module.exports = ChatService; 