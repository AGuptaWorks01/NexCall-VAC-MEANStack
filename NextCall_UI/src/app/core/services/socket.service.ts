import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class SocketService {

  constructor ( private socket: Socket ) {}

  // Method to register a user
  register( username: string ) {
    this.socket.emit( 'register', username );
  }

  // Method to send a private message
  sendPrivateMessage( to: string, message: string ) {
    this.socket.emit( 'private message', {to, message} );
  }

  // Listen for the list of users
  getUserList(): Observable<any> {
    return this.socket.fromEvent( 'userList' );
  }

  // Listen for incoming private messages
  getPrivateMessage(): Observable<any> {
    return this.socket.fromEvent( 'private message' );
  }

  // Listen for the full list of all users
  getAllUsersList(): Observable<any> {
    return this.socket.fromEvent( 'allUserList' );
  }

  // GROUP CHAT METHODS
  createGroup( groupName: string ) {
    this.socket.emit( 'create group', groupName );
  }

  joinGroup( groupId: string ) {
    this.socket.emit( 'join group', groupId );
  }

  leaveGroup( groupId: string ) {
    this.socket.emit( 'leave group', groupId );
  }

  sendGroupMessage( groupId: string, message: string ) {
    this.socket.emit( 'group message', {groupId, message} );
  }

  getGroupList(): Observable<any> {
    return this.socket.fromEvent( 'groupList' );
  }

  getGroupMessages(): Observable<any> {
    return this.socket.fromEvent( 'group message' );
  }

  // Disconnect the socket
  disconnect() {
    this.socket.disconnect();
  }
}
