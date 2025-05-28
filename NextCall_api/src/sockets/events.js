module.exports = {
    // Connection events
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',

    // Call events
    CALL_REQUEST: 'call:request',
    CALL_ACCEPT: 'call:accept',
    CALL_REJECT: 'call:reject',
    CALL_END: 'call:end',
    
    // Room events
    ROOM_JOIN: 'room:join',
    ROOM_LEAVE: 'room:leave',
    
    // Media events
    MEDIA_TOGGLE: 'media:toggle',
    
    // Error events
    ERROR: 'error'
}; 