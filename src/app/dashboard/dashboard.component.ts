import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  constructor() { 
    let inicio = "inicio";    

  }

  ngOnInit() {
    console.log("dentro");
  }

}
