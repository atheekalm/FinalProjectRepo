import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;



  constructor(private auth: AuthServiceService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)
    })
  }

}
