import { Component, OnInit } from '@angular/core';
/** importa el servicio de cliente */
import { ClienteService } from '../shared/services/clientes/cliente.service';
/** importa la interface de cliente */
import { ClienteInterface } from '../models/cliente';
import { NgForm } from '@angular/forms';

/** interface y servicio para el select corporativo */
import { CInterface } from '../models/corporativo';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private clienteservice: ClienteService,
    private corporativoS: CorporativoService ) {}
  /**declarar variable dependiente de la interface*/
  private corporativo: CInterface[];
  private clienteI: ClienteInterface[];

  /** variables para tabla foranea */
  public corporativoid: string;
  public corporativodsc: string;
  /** variable para select */
  public selectedValue: any = 'Seleccionar Corporativo';

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getcorporativos();
  }

  /**funcion para listar los clientes*/
  getListClientes() {
    /**sellecionar funcion del servicio*/
    this.clienteservice.getAllClientes(this.selectedValue).subscribe( response  => {
      /**se asigna el resultado a la variable clienteI */
      this.clienteI = response;
    })
  };

 /**funcion para eliminar los corporativos*/
  onDeleteCliente(idC: string) {
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.clienteservice.deleteCliente(idC);
    }
  }

  /**funcion para modificar los corporativos*/
  onPreUpdateCliente(cliente: ClienteInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.clienteservice.selectedCliente = Object.assign({}, cliente);
  }

  /**funcion para listar los corporativos para el select*/
  getcorporativos() {
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      /**se asigna el resultado a la variable corporativo */
      this.corporativo = response;
    })
  } 
}