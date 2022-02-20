import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiUrl = "https://localhost:5001/api/";
  
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.apiUrl + "Auth/Login", model);
  }
}
