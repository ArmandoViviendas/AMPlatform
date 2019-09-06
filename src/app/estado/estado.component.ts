import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../shared/services/estados/estado.service';
import { EstadoInterface } from '../models/estado';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  constructor(private estadoservice: EstadoService) {}
  private estadoI: EstadoInterface[];

  ngOnInit() {
    this.getListEstado();
  }

  getListEstado(){
    this.estadoservice.getAllEstados().subscribe( response  => {
      this.estadoI = response;
    })
  };

  onDeleteEstado(idestado: string) {
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.estadoservice.deleteEstado(idestado);
    }
  }

  onPreUpdateEstado(estado: EstadoInterface){
    this.estadoservice.selectedEstado = Object.assign({}, estado);
  }

}
