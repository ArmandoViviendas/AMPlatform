import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../shared/services/clientes/cliente.service';
import { ClienteInterface } from '../models/cliente';
import { NgForm } from '@angular/forms';

/** select corporativo */
import { CInterface } from '../models/corporativo';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private clienteservice: ClienteService,
    private corporativoS: CorporativoService ) {}

  private corporativo: CInterface[];
  private clienteI: ClienteInterface[];

  public corporativoid: string;
  public corporativodsc: string;
  
  public selectedValue: any = 'Seleccionar Corporativo';

  ngOnInit() {
    this.getcorporativos();
  }

  getListClientes() {
    this.clienteservice.getAllClientes(this.selectedValue).subscribe( response  => {
      this.clienteI = response;
    })
    
  };

 
  onDeleteCliente(idC: string) {
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.clienteservice.deleteCliente(idC);
    }
  }

  onPreUpdateCliente(cliente: ClienteInterface){
    this.clienteservice.selectedCliente = Object.assign({}, cliente);
  }

  getcorporativos() {
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      this.corporativo = response;
    })
  } 
}