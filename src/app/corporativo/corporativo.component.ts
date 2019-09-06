import { Component, OnInit } from '@angular/core';
/**importa el servicio de corporativo*/
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';
/**importa la interface de corporativo*/
import { CInterface } from '../models/corporativo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-corporativo', 
  templateUrl: './corporativo.component.html',
  styleUrls: ['./corporativo.component.css']
})
export class CorporativoComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private corporativoS: CorporativoService) {}
  /**declarar variable dependiente de la interface*/
  private corporativo: CInterface[];
  
  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getListCorporativos();
  }

  /**funcion para listar los corporativos*/
  getListCorporativos() {
    /**sellecionar funcion del servicio*/
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      /**se asigna el resultado a la variable corporativo */
      this.corporativo = response;
    })
  };

  /**funcion para eliminar los corporativos*/
  onDeleteCorporativo(idCorporativo: string) {
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.corporativoS.deleteCorporativo(idCorporativo);
    }
  }

  /**funcion para modificar los corporativos*/
  onPreUpdateCorporativo(corporativo: CInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.corporativoS.selectedCorporativo = Object.assign({}, corporativo);
  }
}
