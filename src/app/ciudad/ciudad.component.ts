import { Component, OnInit } from '@angular/core';
/** importa el servicio de ciudad */
import { CiudadService } from '../shared/services/ciudades/ciudad.service';
/** importa la interface de ciudad */
import { CiudadInterface } from '../models/ciudad';
import { NgForm } from '@angular/forms';

/** interface y servicio para el select Estado */
import { EstadoService } from '../shared/services/estados/estado.service';
import { EstadoInterface } from '../models/estado';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private ciudadservice: CiudadService,
    private estadoservice: EstadoService) {}

  /**declarar variable dependiente de la interface*/
  private ciudadI: CiudadInterface[];
  private estadoI: EstadoInterface[];
  
  /** variables para tabla foranea */
  public estadoid: string;
  public estadodsc: string;
  /** variable para select */
  public selectedEstado: any = 'Seleccionar Estado';

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getListEstado();
  }

  /**funcion para listar las ciudades*/
  getListCiudad() {
    /**sellecionar funcion del servicio*/
    this.ciudadservice.getAllCiudades(this.selectedEstado).subscribe( response  => {
      /**se asigna el resultado a la variable ciudadI */
      this.ciudadI = response;
    })
  };

  /**funcion para eliminar las ciudades*/
  onDeleteCiudad(idciudad: string) {
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.ciudadservice.deleteCiudad(idciudad);
    }
  }

  /**funcion para modificar los formatos*/
  onPreUpdateCiudad(ciudad: CiudadInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.ciudadservice.selectedCiudad = Object.assign({}, ciudad);
  }

  /**funcion para listar los estaados para el select*/
  getListEstado(){
    this.estadoservice.getAllEstados().subscribe( response  => {
      this.estadoI = response;
    })
  };

}
