import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SocketService} from '../../../core/services/socket.service';

@Component( {
  selector: 'app-group-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
} )
export class GroupChatComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean=true; // For responsive sidebar
  groups: any[]=[];
  selectedGroup: any=null;
  messages: any[]=[];
  messageContent: string='';
  newGroupName: string='';
  currentUser: string|null=null;

  constructor ( private socketService: SocketService ) {}

  ngOnInit(): void {
    this.currentUser=localStorage.getItem( 'username' );
    // No need to register again if already done in single-chat, but good practice if this is a standalone entry point.
    if ( this.currentUser ) {
      this.socketService.register( this.currentUser );
    }

    this.socketService.getGroupList().subscribe( ( groups: any ) => {
      this.groups=groups;
    } );

    this.socketService.getGroupMessages().subscribe( ( message: any ) => {
      if ( this.selectedGroup&&message.groupId===this.selectedGroup.id ) {
        this.messages.push( message );
      }
    } );
  }

  ngOnDestroy(): void {
    // Decide if you want to leave all groups or disconnect socket on component destroy
    // For now, we'll leave it to the user to manually leave groups.
  }

  toggleSidebar(): void {
    this.isSidebarOpen=!this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen=false;
  }

  createGroup(): void {
    if ( this.newGroupName.trim() ) {
      this.socketService.createGroup( this.newGroupName );
      this.newGroupName='';
    }
  }

  selectGroup( group: any ): void {
    if ( this.selectedGroup&&this.selectedGroup.id!==group.id ) {
      // We are switching from one group to another
      this.socketService.leaveGroup( this.selectedGroup.id );
    }
    this.selectedGroup=group;
    this.messages=[]; // Clear messages from previous group
    this.socketService.joinGroup( group.id );

    // Close sidebar on mobile after selecting a chat
    if ( window.innerWidth<768 ) { // md breakpoint
      this.closeSidebar();
    }
  }

  sendMessage(): void {
    if ( this.messageContent.trim()&&this.selectedGroup ) {
      this.socketService.sendGroupMessage( this.selectedGroup.id, this.messageContent );
      // The message will be added to the messages array via the socket listener to avoid duplication.
      this.messageContent='';
    }
  }
}
