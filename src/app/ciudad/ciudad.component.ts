import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../shared/services/ciudades/ciudad.service';
import { CiudadInterface } from '../models/ciudad';
import { NgForm } from '@angular/forms';

/** Select Estado */
import { EstadoService } from '../shared/services/estados/estado.service';
import { EstadoInterface } from '../models/estado';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  constructor(private ciudadservice: CiudadService,
    private estadoservice: EstadoService) {}

  private ciudadI: CiudadInterface[];
  private estadoI: EstadoInterface[];
  
  public estadoid: string;
  public estadodsc: string;
  
  public selectedEstado: any = 'Seleccionar Estado';

  ngOnInit() {
    this.getListEstado();
  }

  getListCiudad() {
    this.ciudadservice.getAllCiudades(this.selectedEstado).subscribe( response  => {
      this.ciudadI = response;
    })
  };

  onDeleteCiudad(idciudad: string) {
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.ciudadservice.deleteCiudad(idciudad);
    }
  }

  onPreUpdateCiudad(ciudad: CiudadInterface){
    this.ciudadservice.selectedCiudad = Object.assign({}, ciudad);
  }

  /** Select estados */
  getListEstado(){
    this.estadoservice.getAllEstados().subscribe( response  => {
      this.estadoI = response;
    })
  };

}
