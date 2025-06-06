import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { HeaderComponent } from "../../../layout/header/header.component";
import { SidebarComponent } from "../../../layout/sidebar/sidebar.component";

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, RouterOutlet, SidebarComponent]
} )
export class HomeComponent {
  
}
