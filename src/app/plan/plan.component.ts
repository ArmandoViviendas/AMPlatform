import { Component, OnInit } from '@angular/core';
import { PlanService } from '../shared/services/plan/plan.service';
import { PlanInterface } from '../models/plan';
import { NgForm } from '@angular/forms';

/** Select Corporativo */
import { CInterface } from '../models/corporativo';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';

/** Select Cliente */
import { ClienteInterface } from '../models/cliente';
import { ClienteService } from '../shared/services/clientes/cliente.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(private planservice: PlanService,
    private corporativoS: CorporativoService,
    private clienteservice: ClienteService) {}

  private PlanI: PlanInterface[];
  private corporativo: CInterface[];
  private clienteI: ClienteInterface[];

  public selectedCorporativo: string = 'Seleccionar Corporativo';
  public selectedCliente: string = 'Seleccionar Cliente';

  ngOnInit() {
    this.getcorporativos();
  }

  getListPlan(){
    this.planservice.getAllPlan(this.selectedCliente).subscribe(response => {
      this.PlanI = response;
    })
  }

  onDeletePlan(idP: string){
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.planservice.deletePlan(idP);
    }
  }

  onPreUpdatePlan(plan: PlanInterface){
    this.planservice.selectedPlan = Object.assign({}, plan);
  }

  /** corporativos */
  getcorporativos() {
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      this.corporativo = response;
    })
  }

  /** Clientes */
  getListClientes() {
    this.clienteservice.getAllClientes(this.selectedCorporativo).subscribe( response  => {
      this.clienteI = response;
    })
  };
}
