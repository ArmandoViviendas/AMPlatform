import { Component, OnInit } from '@angular/core';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';
import { CInterface } from '../models/corporativo';
import { NgForm } from '@angular/forms';

/** cliente */
import { ClienteService } from '../shared/services/clientes/cliente.service';
import { ClienteInterface } from '../models/cliente';

/** Plan */
import { PlanService } from '../shared/services/plan/plan.service';
import { PlanInterface } from '../models/plan';

/** Proyecto */
import { ProyectoService } from '../shared/services/proyecto/proyecto.service';
import { ProyectoInterface } from '../models/proyecto';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private corporaticoS: CorporativoService,
    private clienteservice: ClienteService,
    private planservice: PlanService,
    private proyectoservice: ProyectoService) { }

  ngOnInit() {
  }

  onSaveCorporativo(corporativoForm: NgForm): void {
    if (corporativoForm.value.idC == null){
      //guardar
      this.corporaticoS.addCorporativo(corporativoForm.value);
    }else {
      //modificar
      this.corporaticoS.updateCorporativo(corporativoForm.value);
    }
  }

  onSaveCliente(clienteForm: NgForm): void {
    if (clienteForm.value.idC == null){
      //guardar
      this.clienteservice.addCliente(clienteForm.value);
    }else {
      //modificar
      this.clienteservice.updateCliente(clienteForm.value);
    }
  }

  onSavePlan(planForm: NgForm): void {
    if (planForm.value.idP == null){
      this.planservice.addPlan(planForm.value);
    }else {
      this.planservice.updatePlan(planForm.value);
    }
  }

  onSaveProyecto(proyectoForm: NgForm): void {
    if (proyectoForm.value.idP == null){
      this.proyectoservice.addProyecto(proyectoForm.value);
    }else {
      this.proyectoservice.updateProyecto(proyectoForm.value);
    }
  }

}
