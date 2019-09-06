import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetricaService } from '../services/metrica.service';
import { MetricaViewModel } from '../models/metrica-view-model';
import { MetricasFormComponent } from '../metricas-form/metricas-form.component';

import { CorporativoService } from '../shared/services/corporativos/corporativo.service';

import { ClienteService } from '../shared/services/clientes/cliente.service';
import { PlanService } from '../services/plan.service';
import { ClienteInterface } from '../models/cliente';
import { CInterface } from '../models/corporativo';
import { PlanInterface } from '../models/plan';
import { PlanViewModel } from '../models/plan-view-model';



@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent implements OnInit {

  //Variables públicas para asignar valores del select
  public corporativoObj: any;
  public corporativoid: string;
  public corporativodsc: string;

  //Variables públicas para asignar valores del select
  public clienteObj: any;
  public clienteid: string;
  public clientedsc: string;

  //Variables públicas para asignar valores del select
  public planObj: any;
  public planid: string;
  public plandsc: string;

  private clienteI: ClienteInterface[];
  private corporativo: CInterface[];
  private PlanI: PlanInterface[];
  
  public selectedValueCorp: any = "Seleccione corporativo";//Valiable asignada para no mostrar el select vacío
  public selectedValueCli: any = "Seleccione un cliente";//Valiable asignada para no mostrar el select vacío
  public selectedValuePla: any = "Seleccione un plan";//Valiable asignada para no mostrar el select vacío

  //Inyección de servicios
  constructor(private corporativoS: CorporativoService,
              private clienteservice: ClienteService,
              private planService: PlanService,
              private metricaService: MetricaService,
              private modalService: NgbModal,) { }

  //Consulta por default            
  ngOnInit() {
    this.getcorporativos();
  }

  //Corporativos
  getcorporativos() {
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      this.corporativo = response;
    })
  }
  //Cliente
   getListClientes() {
    this.clienteservice.getAllClientes(this.selectedValueCorp).subscribe( response  => {
      this.clienteI = response;
    })
  };
  
  //Consulta todos los planes
  planes: PlanViewModel[] = [];
  loadPlanes() {
      this.planService.getPlanesPorCliente(this.clienteid).subscribe(response => {
        this.planes = [];
        response.docs.forEach(value => {
          const data = value.data();
          const id = value.id;
          const plan: PlanViewModel = {
            idP: id,
            idcliente: data.idcliente,
            plandsc: data.plandsc,
            clientedsc: data.clientedsc,
            activo: data.activo
          };
          this.planes.push(plan);
        });
      });
    }

    //Consulta metricas por plan 
    metricas: MetricaViewModel[] = [];
    loadMetricas() {
      this.metricaService.getMetricasPorPlan(this.planid).subscribe(response => {
        this.metricas = [];
        response.docs.forEach(value => {
          const data = value.data();
          const id = value.id;
          const metrica: MetricaViewModel = {
            id: id,
            planid: data.planid,
            plandsc: data.plandsc,
            clienteid: data.clienteid,
            clientedsc: data.clientedsc,
            metricadsc: data.metricadsc,
            tipo: data.tipo,
            datovalido: data.datovalido,
            activo: data.activo,
          };
          this.metricas.push(metrica);
        });
      });
    }

  //Funcion para asignar variables provenientes del select del corporativo  
  verC(valueCorp){
    console.log("Objeto corporativo",valueCorp);
    this.corporativoObj = valueCorp;
    this.corporativoid = this.corporativoObj.idCorporativo;
    this.corporativodsc = this.corporativoObj.corporativodsc;
    console.log("corporativoid ",this.corporativoid);
    console.log("corporativodsc ",this.corporativodsc);
    this.getListClientes();
    return valueCorp;
  }

  //Funcion para asignar variables provenientes del select del cliente
  verClie(valueClie){
    console.log("Objeto cliente",valueClie);
    this.clienteObj = valueClie;
    this.clienteid = this.clienteObj.idC;
    this.clientedsc = this.clienteObj.clientedsc;
    console.log("clienteid ",this.clienteid);
    console.log("clientedsc ",this.clientedsc);
    this.loadPlanes();
    return valueClie;
  }

  //Funcion para asignar variables provenientes del select del plan
  verPla(valuePla){
    console.log("Objeto plan",valuePla);
    this.planObj = valuePla;
    this.planid = this.planObj.idP;
    this.plandsc = this.planObj.plandsc;
    console.log("planid ",this.planid);
    console.log("plandsc ",this.plandsc);
    this.loadMetricas();
    return valuePla;
  }

  //Función encargada de abril el modal en su modo de creación
  clickAddMetrica() {
    const modal = this.modalService.open(MetricasFormComponent);
    //Variables obtenidas del select mandadas al modal
    modal.componentInstance.planid = this.planid;
    modal.componentInstance.plandsc = this.plandsc;
    modal.componentInstance.clienteid = this.clienteid;
    modal.componentInstance.clientedsc = this.clientedsc;
    modal.result.then(
      this.handleModalMetricaFormClose.bind(this),
      this.handleModalMetricaFormClose.bind(this)
    )
  }

  /*Funcion que se ejecuta a cerrar el modal y dependiedo
   el valor createMode crea un nuevo documento o busca el documento a editar*/
  handleModalMetricaFormClose(response) {

    if (response === Object(response)) {
      if (response.createMode) {
        response.metrica.id = response.id;
        this.metricas.unshift(response.metrica);
      } else {
        let index = this.metricas.findIndex(value => value.id == response.id);
        this.metricas[index] = response.metrica;
      }
    }
  }

  //Función encargada de abril el modal en su modo de edición
  handleEditClick(metrica: MetricaViewModel) {
    const modal = this.modalService.open(MetricasFormComponent);
    modal.result.then(
      this.handleModalMetricaFormClose.bind(this),
      this.handleModalMetricaFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.metrica = metrica;
  }

  //Función para ejecutar el servicio que elimina la metrica
  handleDeleteClick(metricaId: string, index: number) {
    this.metricaService.deleteMetrica(metricaId)
      .then(() => {
        this.metricas.splice(index, 1);
      })
      .catch(err => console.error(err));
  }

}
