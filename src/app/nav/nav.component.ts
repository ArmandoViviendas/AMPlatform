import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usuario=JSON.parse(localStorage.getItem('user'));
  email = this.usuario.email;
  constructor() { }

  ngOnInit() {
  }

}
