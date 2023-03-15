import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';
import { UserResponse } from '../interface/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL: string = environment.API_URL;

  constructor(private http:HttpClient) { }


  login(user:User){
    return this.http.post<UserResponse>(`${this.API_URL}/login`, user);
  }

  signUp(user:User){
    return this.http.post<UserResponse>(`${this.API_URL}/user`, user);
  }

}
