import { AuthServiceService } from './services/auth-service.service';
import { User } from './models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FinalProject';

  constructor(private authservice: AuthServiceService) { }

  ngOnInit() {
    this.setCurentUser
  }


  setCurentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authservice.setCurrentUser(user);
  }
}
