import { Component, OnInit } from '@angular/core';
/**importa el servicio de cadena*/
import { CadenaService } from '../shared/services/cadenas/cadena.service';
/**importa la interface de cadena*/
import { CadenaInterface } from '../models/cadena';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadena',
  templateUrl: './cadena.component.html',
  styleUrls: ['./cadena.component.css']
})
export class CadenaComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private cadenaservice: CadenaService) { }
  /**declarar variable dependiente de la interface*/
  private cadenaI: CadenaInterface[];

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getListCadenas();
  }

  /**funcion para listar las cadenas*/
  getListCadenas() {
    /**sellecionar funcion del servicio*/
    this.cadenaservice.getAllCadenas().subscribe( response  => {
      /**se asigna el resultado a la variable cadenaI */
      this.cadenaI = response;
    })
  };

  /**funcion para eliminar las cadenas*/
  onDeleteCadena(idcadena: string) {
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.cadenaservice.deleteCadena(idcadena);
    }
  }

  /**funcion para modificar las cadenas*/
  onPreUpdateCadena(cadena: CadenaInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.cadenaservice.selectedCadena = Object.assign({}, cadena);
  }
}
