import {Component, OnInit, OnDestroy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SocketService} from '../../../core/services/socket.service';
import {AuthService} from '../../../core/services/auth.service';

@Component( {
  selector: 'app-single-chat',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatMenuModule, FormsModule],
  templateUrl: './single-chat.component.html',
  styleUrl: './single-chat.component.scss'
} )
export class SingleChatComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean=true;
  allUsers: any[]=[];
  onlineUserMap: Map<string, any>=new Map();
  combinedUsers: any[]=[];
  messages: any[]=[];
  selectedUser: any=null;
  messageContent: string='';
  currentUser: string|null=null;

  constructor ( private socketService: SocketService ) {}

  ngOnInit(): void {
    this.currentUser=localStorage.getItem( 'username' );
    if ( this.currentUser ) {
      this.socketService.register( this.currentUser );
    }

    this.socketService.getAllUsersList().subscribe( users => {
      this.allUsers=users;
      this.updateCombinedUsers();
    } );

    this.socketService.getUserList().subscribe( ( onlineUsers: any[] ) => {
      this.onlineUserMap.clear();
      onlineUsers.forEach( user => this.onlineUserMap.set( user.username, user ) );
      this.updateCombinedUsers();
    } );

    this.socketService.getPrivateMessage().subscribe( ( message ) => {
      if ( this.selectedUser&&message.from===this.selectedUser.username ) {
        this.messages.push( message );
      }
    } );
  }

  updateCombinedUsers(): void {
    if ( !this.allUsers.length ) return;
    this.combinedUsers=this.allUsers
      .filter( user => user.username!==this.currentUser )
      .map( user => ( {
        ...user,
        isOnline: this.onlineUserMap.has( user.username ),
        id: this.onlineUserMap.get( user.username )?.id||null // Get socket ID if online
      } ) );
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  toggleSidebar(): void {
    this.isSidebarOpen=!this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen=false;
  }

  selectChat( user: any ) {
    this.selectedUser=user;
    this.messages=[]; // Clear previous messages
    console.log( 'Selected chat with:', user.username );

    if ( window.innerWidth<768 ) {
      this.closeSidebar();
    }
  }

  sendMessage(): void {
    if ( this.messageContent.trim()&&this.selectedUser&&this.selectedUser.isOnline ) {
      this.socketService.sendPrivateMessage( this.selectedUser.id, this.messageContent );
      this.messages.push( {from: this.currentUser, message: this.messageContent} );
      this.messageContent='';
    } else {
      console.log( 'Cannot send message, user is offline or no user selected.' );
      // Optionally, show a toastr notification or message in the UI
    }
  }
}
