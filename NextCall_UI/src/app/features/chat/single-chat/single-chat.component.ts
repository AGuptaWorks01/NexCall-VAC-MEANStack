import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';


@Component( {
  selector: 'app-single-chat',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatMenuModule],
  templateUrl: './single-chat.component.html',
  styleUrl: './single-chat.component.scss'
} )
export class SingleChatComponent {
  isSidebarOpen: boolean=true;


  toggleSidebar(): void {
    this.isSidebarOpen=!this.isSidebarOpen;
  }

}
