import { Component, OnInit } from '@angular/core';
/**importa el servicio de estado*/
import { EstadoService } from '../shared/services/estados/estado.service';
/**importa la interface de estado*/
import { EstadoInterface } from '../models/estado';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private estadoservice: EstadoService) {}
  /**declarar variable dependiente de la interface*/
  private estadoI: EstadoInterface[];

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getListEstado();
  }

  /**funcion para listar los estados*/
  getListEstado(){
    /**sellecionar funcion del servicio*/
    this.estadoservice.getAllEstados().subscribe( response  => {
      /**se asigna el resultado a la variable estadoI */
      this.estadoI = response;
    })
  };

  /**funcion para eliminar estados*/
  onDeleteEstado(idestado: string) {
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.estadoservice.deleteEstado(idestado);
    }
  }

  /**funcion para modificar estados*/
  onPreUpdateEstado(estado: EstadoInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.estadoservice.selectedEstado = Object.assign({}, estado);
  }

}
