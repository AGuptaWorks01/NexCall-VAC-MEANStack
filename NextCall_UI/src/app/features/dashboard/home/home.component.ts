import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
} )
export class HomeComponent {
  private router=inject( Router );
  private authService=inject( AuthService );
  private toastr=inject( ToastrService );

  username: string|null='';
  
  ngOnInit(): void {
    this.username=localStorage.getItem( 'username' );
  }

  logout() {
    this.authService.logout();
    this.toastr.success( 'Logged out successfully' );
    this.router.navigateByUrl( 'login' );
  }
}
