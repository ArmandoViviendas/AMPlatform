import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-personal',
  templateUrl: './editar-personal.component.html',
  styleUrls: ['./editar-personal.component.css']
})
export class EditarPersonalComponent implements OnInit {
  usuario=JSON.parse(localStorage.getItem('user'));
  
  constructor() { }

  ngOnInit() {
  }

}
