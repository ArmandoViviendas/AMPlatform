import { Component, OnInit } from '@angular/core';
import { CadenaService } from '../shared/services/cadenas/cadena.service';
import { CadenaInterface } from '../models/cadena';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadena',
  templateUrl: './cadena.component.html',
  styleUrls: ['./cadena.component.css']
})
export class CadenaComponent implements OnInit {

  constructor(private cadenaservice: CadenaService) { }
  private cadenaI: CadenaInterface[];

  ngOnInit() {
    this.getListCadenas();
  }

  getListCadenas() {
    this.cadenaservice.getAllCadenas().subscribe( response  => {
      this.cadenaI = response;
    })
  };

  onDeleteCadena(idcadena: string) {
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.cadenaservice.deleteCadena(idcadena);
    }
  }

  onPreUpdateCadena(cadena: CadenaInterface){
    this.cadenaservice.selectedCadena = Object.assign({}, cadena);
  }
}
