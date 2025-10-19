import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../shared/api-urls.enum';

export interface User {
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  profileImageUrl: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post(ApiUrls.AddUser, user);
  }
}
