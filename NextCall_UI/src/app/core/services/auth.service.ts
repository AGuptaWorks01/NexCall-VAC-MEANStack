import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

// Define the structure of your token payload
interface TokenPayload {
  username: string;
  email: string;
  _id: string;
  // Add any other fields you included in the token
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  data: {
    _id: string;
    username: string;
    email: string;
  };
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

@Injectable( {
  providedIn: 'root',
} )
export class AuthService {
  private isLoggedInSubject=new BehaviorSubject<boolean>( false );
  public isLoggedIn$=this.isLoggedInSubject.asObservable();

  private tokenKey='auth_token';
  private username='username';

  private _http=inject( HttpClient );
  private _environment=environment.baseUrl;

  constructor () {
    const token=this.getAuthToken();
    this.isLoggedInSubject.next( !!token );
  }

  getAuthToken(): string|null {
    return localStorage.getItem( this.tokenKey );
  }

  setLoginStatus( response: LoginResponse ): void {
    localStorage.setItem( this.tokenKey, response.token );
    try {
      const decoded: TokenPayload=jwtDecode( response.token );
      localStorage.setItem( this.username, decoded.username );
      console.log( 'Decoded username:', decoded.username );
    } catch ( e ) {
      console.error( 'Error decoding token:', e );
    }
    this.isLoggedInSubject.next( true );
  }

  logout(): void {
    localStorage.removeItem( this.tokenKey );
    localStorage.removeItem( this.username );
    this.isLoggedInSubject.next( false );
  }

  userRegister( reqObj: RegisterRequest ) {
    return this._http.post<RegisterResponse>( `${ this._environment }/register`, reqObj );
  }

  userlogin( reqObj: LoginRequest ) {
    return this._http.post<LoginResponse>( `${ this._environment }/login`, reqObj ).pipe(
      tap( response => this.setLoginStatus( response ) )
    );
  }
}
