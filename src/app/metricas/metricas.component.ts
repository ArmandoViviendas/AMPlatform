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

  public corporativoObj: any;
  public corporativoid: string;
  public corporativodsc: string;

  public clienteObj: any;
  public clienteid: string;
  public clientedsc: string;

  public planObj: any;
  public planid: string;
  public plandsc: string;

  private clienteI: ClienteInterface[];
  private corporativo: CInterface[];
  private PlanI: PlanInterface[];
  
  public selectedValueCorp: any = "Seleccione corporativo";
  public selectedValueCli: any = "Seleccione un cliente";
  public selectedValuePla: any = "Seleccione un plan";


  constructor(private corporativoS: CorporativoService,
              private clienteservice: ClienteService,
              private planService: PlanService,
              private metricaService: MetricaService,
              private modalService: NgbModal,) { }

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
  
  //Plan
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

    //Metricas
    metricas: MetricaViewModel[] = [];
    loadMetricas() {
      this.metricaService.getMetricas().subscribe(response => {
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

  clickAddMetrica() {
    const modal = this.modalService.open(MetricasFormComponent);
    modal.componentInstance.planid = this.planid;
    modal.componentInstance.plandsc = this.plandsc;
    modal.result.then(
      this.handleModalMetricaFormClose.bind(this),
      this.handleModalMetricaFormClose.bind(this)
    )
  }

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

}
