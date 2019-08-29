import { Component, OnInit } from '@angular/core';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons"



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usuario=JSON.parse(localStorage.getItem('user'));
  email = this.usuario.email;
  faHome = faHome;
  faBuilding = faBuilding;
  faSearch = faSearch;
  faWindowClose = faWindowClose;
  faCopyright = faCopyright;
  constructor() { }

  ngOnInit() {
  }

}
