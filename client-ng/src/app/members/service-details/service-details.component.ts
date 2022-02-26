import { Component, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  @Input() ProfileDetails: any;
  constructor() { }

  ngOnInit(): void {
  }

}
