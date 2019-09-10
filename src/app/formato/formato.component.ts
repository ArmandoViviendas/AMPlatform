import { Component, OnInit } from '@angular/core';
/** importa el servicio de formato */
import { FormatoService } from '../shared/services/formato/formato.service';
/** importa la interface de formato */
import { FormatoInterface } from '../models/formato';
import { NgForm } from '@angular/forms';

/** interface y servicio para el select cadena */
import { CadenaService } from '../shared/services/cadenas/cadena.service';
import { CadenaInterface } from '../models/cadena';

@Component({
  selector: 'app-formato',
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.css']
})
export class FormatoComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private formatoservice: FormatoService,
    private cadenaservice: CadenaService) {}

  /**declarar variable dependiente de la interface*/
  private formatoI: FormatoInterface[];
  private cadenaI: CadenaInterface[];

  /** variables para tabla foranea */
  public cadenaid: string;
  public cadenadsc: string;
  /** variable para select */
  public selectedCadena: any = 'Seleccionar Cadena';

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getcadenas();
  }

  /**funcion para listar los formatos*/
  getListFormato() {
    /**sellecionar funcion del servicio*/
    this.formatoservice.getAllFormatos(this.selectedCadena).subscribe( response  => {
      /**se asigna el resultado a la variable formatoI */
      this.formatoI = response;
    })
  };

  /**funcion para eliminar los fromatos*/
  onDeleteFormato(idformato: string) {
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.formatoservice.deleteFormato(idformato);
    }
  }

  /**funcion para modificar los formatos*/
  onPreUpdateFormato(formato: CadenaInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.formatoservice.selectedFormato = Object.assign({}, formato);
  }

  /**funcion para listar las cadenas para el select*/
  getcadenas() {
    this.cadenaservice.getAllCadenas().subscribe( response  => {
      this.cadenaI = response;
    })
  } 

}
