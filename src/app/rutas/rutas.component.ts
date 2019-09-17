import { Component, OnInit } from '@angular/core';
import { RutaService } from  '../shared/services/rutas/ruta.service';
import { RutaInterface } from '../models/rutas';
import { NgForm } from '@angular/forms';

import { IgxCalendarComponent } from 'igniteui-angular';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {

  constructor(private rutaservice: RutaService) {}

  /** variables de interfaz */
  private rutaI: RutaInterface[];

  ngOnInit() {
    this.getListRutas();
  }

  getListRutas(){
    /** mandar el filtro al servicio */
    this.rutaservice.getAllRutas().subscribe(response => {
      this.rutaI = response;
    })
  }

  /** funcion para eliminar tiendaas */
  onDeleteRuta(idR: string){
    /** mensaje de confirmacion */
    const confirmacion = confirm('estas seguro?');
    /** si la confirmacion es positiva se manda al servicio de lo contrario no hace nada */
    if(confirmacion){
      /** seleccionar funcion del servicio y mandar el id */
      this.rutaservice.deleteRuta(idR);
    }
  }

  /** funcion para modificar */
  onPreUpdateRuta(ruta: RutaInterface){
    /** seleccion funcion del servicio y mandar los valores */
    this.rutaservice.selectedRuta = Object.assign({}, ruta);
  }

}