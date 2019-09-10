import { Component, OnInit } from '@angular/core';
/** importar interface y servicio del catalogo */
import { TiendaService } from '../shared/services/tiendas/tienda.service';
import { TiendaInterface } from '../models/tienda';
import { NgForm } from '@angular/forms';

/** interface y servicio para el select corporativo */
import { CInterface } from '../models/corporativo';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';

/** interface y servicio para el Select Cliente */
import { ClienteInterface } from '../models/cliente';
import { ClienteService } from '../shared/services/clientes/cliente.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  /** variables del servicio */
  constructor(private tiendaservice: TiendaService,
    private corporativoS: CorporativoService,
    private clienteservice: ClienteService) {}

  /** variables de interfaz */
  private TiendaI: TiendaInterface[];
  private corporativo: CInterface[];
  private clienteI: ClienteInterface[];

  /** variables para el select */
  public selectedCorporativo: string = 'Seleccionar Corporativo';
  public selectedCliente: any = 'Seleccionar Cliente';

  /** funcion que iniciara primero */
  ngOnInit() {
    this.getcorporativos();
  }

  /** funcion para obtener todas las tiendas */
  getListTiendas(){
    /** mandar el filtro al servicio */
    this.tiendaservice.getAllTiendas(this.selectedCliente).subscribe(response => {
      this.TiendaI = response;
    })
  }

  /** funcion para eliminar tiendaas */
  onDeleteTienda(idT: string){
    /** mensaje de confirmacion */
    const confirmacion = confirm('estas seguro?');
    /** si la confirmacion es positiva se manda al servicio de lo contrario no hace nada */
    if(confirmacion){
      /** seleccionar funcion del servicio y mandar el id */
      this.tiendaservice.deleteTienda(idT);
    }
  }

  /** funcion para modificar */
  onPreUpdateTienda(tienda: TiendaInterface){
    /** seleccion funcion del servicio y mandar los valores */
    this.tiendaservice.selectedTienda = Object.assign({}, tienda);
  }

  /** select corporativo */
  getcorporativos() {
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      this.corporativo = response;
    })
  }

  /** select clientes */
  getListClientes() {
    this.clienteservice.getAllClientes(this.selectedCorporativo).subscribe( response  => {
      this.clienteI = response;
    })
  };

}
