import { Component, OnInit } from '@angular/core';
/** importa el servicio de plan */
import { PlanService } from '../shared/services/plan/plan.service';
/** importa la interface de plan */
import { PlanInterface } from '../models/plan';
import { NgForm } from '@angular/forms';

/** interface y servicio para el select corporativo */
import { CInterface } from '../models/corporativo';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';

/** interface y servicio para el Select Cliente */
import { ClienteInterface } from '../models/cliente';
import { ClienteService } from '../shared/services/clientes/cliente.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  /**declarar variable dependiente del servicio*/
  constructor(private planservice: PlanService,
    private corporativoS: CorporativoService,
    private clienteservice: ClienteService) {}

  /**declarar variable dependiente de la interface*/
  private PlanI: PlanInterface[];
  private corporativo: CInterface[];
  private clienteI: ClienteInterface[];

  /** variables para el select */
  public selectedCorporativo: string = 'Seleccionar Corporativo';
  public selectedCliente: any = 'Seleccionar Cliente';

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getcorporativos();
  }

  /**funcion para listar plan*/
  getListPlan(){
    /**sellecionar funcion del servicio*/
    this.planservice.getAllPlan(this.selectedCliente).subscribe(response => {
      /**se asigna el resultado a la variable PlanI */
      this.PlanI = response;
    })
  }

  /**funcion para eliminar plan*/
  onDeletePlan(idP: string){
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.planservice.deletePlan(idP);
    }
  }

  /**funcion para modificar plan*/
  onPreUpdatePlan(plan: PlanInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.planservice.selectedPlan = Object.assign({}, plan);
  }

  /**funcion para listar los corporativos para el select*/
  getcorporativos() {
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      /**se asigna el resultado a la variable corporativo */
      this.corporativo = response;
    })
  }

  /**funcion para listar los clientes para el select*/
  getListClientes() {
    this.clienteservice.getAllClientes(this.selectedCorporativo).subscribe( response  => {
      /**se asigna el resultado a la variable clienteI */
      this.clienteI = response;
    })
  };
}
