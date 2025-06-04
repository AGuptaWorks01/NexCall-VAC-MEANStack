import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component( {
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
} )
export class RegisterComponent implements OnInit {
  private fb=inject( FormBuilder )
  private authService=inject( AuthService )
  private router=inject( Router )
  private toastr=inject( ToastrService )

  userForm!: FormGroup;

  constructor () {
    this.userForm=this.fb.group( {
      username: ['', Validators.required],
      email: ['', Validators.compose( [Validators.required, Validators.email] )],
      password: ['', Validators.required]
    } )
  }

  ngOnInit(): void {}
  showPassword: boolean=false;

  register() {
    if ( this.userForm.invalid ) {
      this.toastr.warning( 'Please fill in all required fields' );
      return;
    }

    this.authService.userRegister( this.userForm.value ).subscribe( {
      next: () => {
        this.toastr.success( 'Registration Complete!', 'Success' );
        setTimeout( () => {
          this.router.navigateByUrl( 'login' );
        }, 1000 );
      },
      error: ( err ) => {
        // console.log( 'Register Error:', err );

        if ( err.error?.message==='User already exists' ) {
          this.toastr.error( 'User already exists. Please try with a different email.' );
        } else {
          this.toastr.warning( 'Error while registering!' );
        }
      }
    } )
  }

}
