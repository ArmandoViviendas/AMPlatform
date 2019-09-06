import { Component, OnInit } from '@angular/core';
/**importa el servicio de region*/
import { RegionService } from  '../shared/services/regiones/region.service';
/**importa la interface de region*/
import { RegionInterface } from '../models/region';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private regionservice: RegionService) {}
  /**declarar variable dependiente de la interface*/
  private regionI: RegionInterface[];

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getListRegion();
  }

   /**funcion para listar la region*/
  getListRegion(){
    /**sellecionar funcion del servicio*/
    this.regionservice.getAllRegiones().subscribe( response  => {
      /**se asigna el resultado a la variable regionI */
      this.regionI = response;
    })
  };

  /**funcion para eliminar regiones*/
  onDeleteRegion(idregion: string) {
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.regionservice.deleteRegion(idregion);
    }
  }

  /**funcion para modificar regiones*/
  onPreUpdateRegion(region: RegionInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.regionservice.selectedRegion = Object.assign({}, region);
  }

}
