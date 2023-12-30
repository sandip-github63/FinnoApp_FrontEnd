import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import endPoint from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public addUser(user: User) {
    return this.http.post(`${endPoint}/user/register`, user);
  }
}
