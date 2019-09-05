import { Component, OnInit } from '@angular/core';
import { FormatoService } from '../shared/services/formato/formato.service';
import { FormatoInterface } from '../models/formato';
import { NgForm } from '@angular/forms';

/** Select Cadena */
import { CadenaService } from '../shared/services/cadenas/cadena.service';
import { CadenaInterface } from '../models/cadena';

@Component({
  selector: 'app-formato',
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.css']
})
export class FormatoComponent implements OnInit {

  constructor(private formatoservice: FormatoService,
    private cadenaservice: CadenaService) {}

  private formatoI: FormatoInterface[];
  private cadenaI: CadenaInterface[];

  public cadenaid: string;
  public cadenadsc: string;

  public selectedCadena: any = 'Seleccionar Cadena';

  ngOnInit() {
    this.getcadenas();
  }

  getListFormato() {
    this.formatoservice.getAllFormatos(this.selectedCadena).subscribe( response  => {
      this.formatoI = response;
    })
  };

  onDeleteFormato(idformato: string) {
    console.log(idformato);
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.formatoservice.deleteFormato(idformato);
    }
  }

  onPreUpdateFormato(formato: CadenaInterface){
    this.formatoservice.selectedFormato = Object.assign({}, formato);
  }

  /** Select Cadenas */
  getcadenas() {
    this.cadenaservice.getAllCadenas().subscribe( response  => {
      this.cadenaI = response;
    })
  } 

}
