import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiUrl = "https://localhost:5001/api/";
  private currentuserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentuserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.apiUrl + "Auth/Login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentuserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentuserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
