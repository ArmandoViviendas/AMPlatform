import { Component, OnInit } from '@angular/core';
/** importa el servicio de proyecto */
import { ProyectoService } from '../shared/services/proyecto/proyecto.service';
/** importa la interface de proyecto */
import { ProyectoInterface } from '../models/proyecto';
import { NgForm } from '@angular/forms';

/** interface y servicio para el select corporativo */
import { CInterface } from '../models/corporativo';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';

/** interface y servicio para el Select Cliente */
import { ClienteInterface } from '../models/cliente';
import { ClienteService } from '../shared/services/clientes/cliente.service';

/** interface y servicio para el Select plan */
import { PlanInterface } from '../models/plan';
import { PlanService } from '../shared/services/plan/plan.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

   /**declarar variable dependiente del servicio*/
  constructor(private proyectoservice: ProyectoService,
    private corporativoS: CorporativoService,
    private clienteservice: ClienteService,
    private planservice: PlanService) {}

  /**declarar variable dependiente de la interface*/
  private ProyectoI: ProyectoInterface[];
  private corporativo: CInterface[];
  private clienteI: ClienteInterface[];
  private PlanI: PlanInterface[];

  /** variables para el select */
  public selectedCorporativo: string = 'Seleccionar Corporativo';
  public selectedCliente: any = 'Seleccionar Cliente';
  public selectedPlan: any = 'Seleccionar Plan';

  /**funcion que va a iniciar al cargar la pagina*/
  ngOnInit() {
    this.getcorporativos();
  }

  /**funcion para listar proyecto*/
  getListProyectos(){
    /**sellecionar funcion del servicio*/
    this.proyectoservice.getAllProyectos(this.selectedPlan).subscribe(response => {
      /**se asigna el resultado a la variable proyectoI */
      this.ProyectoI = response;
    })
  }

  /**funcion para eliminar proyecto*/
  onDeleteProyecto(idP: string){
    /**Mensaje de confirmacion para eliminar*/
    const confirmacion = confirm('estas seguro?');
    /**si la confirmacion es positiva se manda al servicio si no no hace nada*/
    if(confirmacion){
      /**sellecionar funcion del servicio y mandar el id*/
      this.proyectoservice.deleteProyecto(idP);
    }
  }

  /**funcion para modificar proyecto*/
  onPreUpdateProyecto(proyecto: ProyectoInterface){
    /**sellecionar funcion del servicio y mandar la informacion*/
    this.proyectoservice.selectedProyecto = Object.assign({}, proyecto);
  }

  /**funcion para listar los corporativos para el select*/
  getcorporativos() {
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      this.corporativo = response;
    })
  }

  /**funcion para listar los clientes para el select*/
  getListClientes() {
    this.clienteservice.getAllClientes(this.selectedCorporativo).subscribe( response  => {
      this.clienteI = response;
    })
  };

  /**funcion para listar plan para el select*/
  getListPlan(){
    this.planservice.getAllPlan(this.selectedCliente).subscribe(response => {
      this.PlanI = response;
    })
  }
}
