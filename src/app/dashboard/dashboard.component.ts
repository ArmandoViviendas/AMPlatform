import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';



@Component({
  selector: 'app-container',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  usuario=JSON.parse(localStorage.getItem('user'));
  email = this.usuario.email;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    /*localStorage.removeItem('user');
    console.log("dentro");
    console.log(localStorage.getItem('user'));
    this.authService.SignOut();*/
    //this.usuario = JSON.parse(localStorage.getItem('user'));
    console.log("this.usuario"+this.usuario.email);
  }

}
