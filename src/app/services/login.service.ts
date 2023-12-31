import { Injectable } from '@angular/core';
import endPoint from './helper';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  //service to generate token

  public generateToken(user: User) {
    return this.http.post(`${endPoint}/user/authenticate`, user);
  }

  //Once token generate then store token in Local Storage in web browser

  public setTokenLocalStorage(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // isLoginedIn : user is Logged in or not

  public isLoginedIn() {
    let token = localStorage.getItem('token');

    if (token == null) {
      return false;
    } else {
      return true;
    }
  }

  //logout : remove token from local storage

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return true;
  }

  //get token

  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetails

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get userDeails

  public getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  //get user Role

  public getUserRole() {
    let user = this.getUser(); // Get the user object from localStorage

    // Check if the user object exists and has authorities
    if (
      user &&
      user.userWithAuthorities &&
      user.userWithAuthorities.authorities
    ) {
      // Access the authorities array
      let authorities = user.userWithAuthorities.authorities;

      // Now you can use the authorities array as needed
      // For example, you can log it to the console

      return authorities;

      // You can also access individual authorities by index, e.g., authorities[0]
      // or loop through them if there are multiple authorities.
    } else {
      // Handle the case where the user object or authorities are missing
      console.error('User or authorities not found.');
      return null;
    }
  }

  public getUserRoleByUser(user: any) {
    // Check if the user object exists and has authorities
    if (
      user &&
      user.userWithAuthorities &&
      user.userWithAuthorities.authorities
    ) {
      let authorities = user.userWithAuthorities.authorities;

      return authorities;

      // You can also access individual authorities by index, e.g., authorities[0]
      // or loop through them if there are multiple authorities.
    } else {
      // Handle the case where the user object or authorities are missing
      console.error('User or authorities not found.');
      return null;
    }
  }

  //get current login user detail

  public getCurrentLoginUser() {
    return this.http.get(`${endPoint}/user/currentLoginUser`);
  }
}
