import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  constructor(private http: HttpClient) { }
  serviceProfiles: any;
  ngOnInit() {
    this.http.get('https://localhost:5001/api/Service/Services').subscribe(response => {
      this.serviceProfiles = response
    }, error => {
      console.log(error)
    })
  }

}
