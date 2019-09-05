import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../shared/services/proyecto/proyecto.service';
import { ProyectoInterface } from '../models/proyecto';
import { NgForm } from '@angular/forms';

/** Select Corporativo */
import { CInterface } from '../models/corporativo';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';

/** Select Cliente */
import { ClienteInterface } from '../models/cliente';
import { ClienteService } from '../shared/services/clientes/cliente.service';

/** Select Plan */
import { PlanInterface } from '../models/plan';
import { PlanService } from '../shared/services/plan/plan.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  constructor(private proyectoservice: ProyectoService,
    private corporativoS: CorporativoService,
    private clienteservice: ClienteService,
    private planservice: PlanService) {}

  private ProyectoI: ProyectoInterface[];
  private corporativo: CInterface[];
  private clienteI: ClienteInterface[];
  private PlanI: PlanInterface[];

  public selectedCorporativo: string = 'Seleccionar Corporativo';
  public selectedCliente: any = 'Seleccionar Cliente';
  public selectedPlan: any = 'Seleccionar Plan';

  ngOnInit() {
    this.getcorporativos();
  }

  getListProyectos(){
    this.proyectoservice.getAllProyectos(this.selectedPlan).subscribe(response => {
      this.ProyectoI = response;
    })
  }

  onDeleteProyecto(idP: string){
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.proyectoservice.deleteProyecto(idP);
    }
  }

  onPreUpdateProyecto(proyecto: ProyectoInterface){
    this.proyectoservice.selectedProyecto = Object.assign({}, proyecto);
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

  /** Plan */
  getListPlan(){
    this.planservice.getAllPlan(this.selectedCliente).subscribe(response => {
      this.PlanI = response;
    })
  }
}
