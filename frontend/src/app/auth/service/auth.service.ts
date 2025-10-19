import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { ApiUrls } from '../../shared/api-urls.enum';
import { LoginResponse } from '../model/login-response.model';
import {JwtHelperService} from "@auth0/angular-jwt";
import { Observable, of, throwError } from "rxjs";
import { User } from '../../user-list/user-management.service';


@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.access_token = localStorage.getItem("jwt");
  }

  private access_token: string | null = null;

  login(username: string, password: string): Observable<LoginResponse> {
    const loginHeaders = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json"
    });

    const body = {
      "username": username,
      "password": password
    };
    return this.http.post<LoginResponse>(ApiUrls.LogIn, JSON.stringify(body), {headers: loginHeaders})
      .pipe(map((res: LoginResponse) => {
        this.access_token = res.accessToken;
        localStorage.setItem("passwordChangeRequired", res.passwordChangeRequired.toString());
        localStorage.setItem("jwt", res.accessToken)
        return res;
    }));
  }

  changePassword(oldPassword: any, newPassword: any): Observable<unknown> {
    const loginHeaders = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json"
    });

    const body = {
      "oldPassword": oldPassword,
      "newPassword": newPassword
    };

    return this.http.post<HttpResponseBase>(ApiUrls.ChangePassword, JSON.stringify(body), {headers: loginHeaders})
    .pipe(map((_) => true), catchError((err) => err.status == 400 ? of(false) : err));
  }

  signup(user: User) {
    return this.http.post(ApiUrls.SignUp, user);
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

  getLoggedUserId() {
    const token: any = localStorage.getItem("jwt");
    const helper = new JwtHelperService();
    return helper.decodeToken(token).id;
  }

  getUserById(id: number) : Observable<any>{
    return this.http.get<any>(ApiUrls.GetUserById + "/" + id)
  }

  isLoggedIn(): boolean {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      console.log("returning flase");
      return false;
    }
    return !this.jwtHelper.isTokenExpired(jwt);
  }

  getRoles(): string[] {
    const jwt = localStorage.getItem("jwt")
    if (!jwt) {
      return ["UNREGISTERED"];
    }
    if (localStorage.getItem("passwordChangeRequired") === "true")  {
      return ["PASSWORD_CHANGE_REQUIRED"]
    }
    return this.jwtHelper.decodeToken(jwt).roles;
  }

  getUsername(): string {
    const jwt = localStorage.getItem("jwt")
    if (!jwt) {
      console.error("Tried to get username of unauthenticated user");
      throw "Cannot get username if user is not logged in";
    }
    return this.jwtHelper.decodeToken(jwt).sub;
  }
}
