import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../shared/services/clientes/cliente.service';
import { ClienteInterface } from '../models/cliente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private clienteservice: ClienteService) { }
  private clienteI: ClienteInterface[];

  ngOnInit() {
    this.getListClientes();
  }

  getListClientes() {
    this.clienteservice.getAllClientes().subscribe( response  => {
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
}
