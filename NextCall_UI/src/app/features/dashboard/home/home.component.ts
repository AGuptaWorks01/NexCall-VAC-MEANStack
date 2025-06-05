import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import { HeaderComponent } from "../../../layout/header/header.component";

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, RouterOutlet]
} )
export class HomeComponent {
  
}
