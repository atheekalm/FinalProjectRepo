import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  model: any;
  constructor() { }

  ngOnInit(): void {
  }
  login() {
    console.log(this.model);
  }

}
