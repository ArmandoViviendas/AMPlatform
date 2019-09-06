import { Component, OnInit } from '@angular/core';
/**importa el servicio de canal*/
import { CanalService } from '../shared/services/canal/canal.service';
/**importa la interface de canal*/
import { CanalInterface } from '../models/canal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.css']
})
export class CanalComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private canalservice: CanalService) {}
  /**declarar variable dependiente de la interface*/
  private canalI: CanalInterface[];

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getListCanal();
  }

   /**funcion para listar los canales*/
  getListCanal(){
    /**sellecionar funcion del servicio*/
    this.canalservice.getAllCanales().subscribe( response  => {
      /**se asigna el resultado a la variable canalI */
      this.canalI = response;
    })
  };

  /**funcion para eliminar los canales*/
  onDeleteCanal(idcanal: string) {
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.canalservice.deleteCanal(idcanal);
    }
  }

  /**funcion para modificar los canales*/
  onPreUpdateCanal(canal: CanalInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.canalservice.selectedCanal = Object.assign({}, canal);
  }
}