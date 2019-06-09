import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
list:any = [];
  constructor() { }

  ngOnInit() {
    this.list=localStorage.getItem('listname');
    if(this.list.length > 0) {
      this.list=this.list.split(',');
    }
   
  }

}
