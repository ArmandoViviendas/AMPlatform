import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
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

/** Cadena */
import { CadenaService } from '../shared/services/cadenas/cadena.service';
import { CadenaInterface } from '../models/cadena';

/** Formato */
import { FormatoService } from '../shared/services/formato/formato.service';
import { FormatoInterface } from '../models/formato';

/** Canal */
import { CanalService } from '../shared/services/canal/canal.service';
import { CanalInterface } from '../models/canal';

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
    private proyectoservice: ProyectoService,
    private cadenaservice: CadenaService,
    private formatoservice: FormatoService,
    private canalservice: CanalService) { }

  ngOnInit() {
  }

  //corporativo
  onSaveCorporativo(corporativoForm: NgForm): void {
    if (corporativoForm.value.idC == null){
      //guardar
      this.corporaticoS.addCorporativo(corporativoForm.value);
    }else {
      //modificar
      this.corporaticoS.updateCorporativo(corporativoForm.value);
    }
  }

  //cliente
  onSaveCliente(clienteForm: NgForm): void {
    if (clienteForm.value.idC == null){
      //guardar
      this.clienteservice.addCliente(clienteForm.value);
    }else {
      //modificar
      this.clienteservice.updateCliente(clienteForm.value);
    }
  }

  //plan
  onSavePlan(planForm: NgForm): void {
    if (planForm.value.idP == null){
      this.planservice.addPlan(planForm.value);
    }else {
      this.planservice.updatePlan(planForm.value);
    }
  }

  //proyecto
  onSaveProyecto(proyectoForm: NgForm): void {
    if (proyectoForm.value.idP == null){
      this.proyectoservice.addProyecto(proyectoForm.value);
    }else {
      this.proyectoservice.updateProyecto(proyectoForm.value);
    }
  }

  //cadena
  onSaveCadena(cadenaForm: NgForm): void {
    if (cadenaForm.value.idcadena == null){
      this.cadenaservice.addCadena(cadenaForm.value);
    }else {
      this.cadenaservice.updateCadena(cadenaForm.value);
    }
  }

  //cadena
  onSaveFormato(formatoForm: NgForm): void {
    if (formatoForm.value.idformato == null){
      this.formatoservice.addFormato(formatoForm.value);
    }else {
      this.formatoservice.updateFormato(formatoForm.value);
    }
  }

  //canal
  onSaveCanal(canalForm: NgForm): void {
    if (canalForm.value.idcanal == null){
      this.canalservice.addCanal(canalForm.value);
    }else {
      this.canalservice.updateCanal(canalForm.value);
    }
  }
}
