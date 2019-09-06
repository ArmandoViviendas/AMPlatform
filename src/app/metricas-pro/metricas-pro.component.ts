import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanViewModel } from '../models/plan-view-model';
import { PlanService } from '../services/plan.service';
import { ProyectoService } from '../shared/services/proyecto/proyecto.service';
import { ProyectoInterface } from '../models/proyecto';
import { MetricaService } from '../services/metrica.service';
import { MetricaViewModel } from '../models/metrica-view-model';
import { ProductoService } from '../services/producto.service';
import { ProductoViewModel } from '../models/producto-view-model';

@Component({
  selector: 'app-metricas-pro',
  templateUrl: './metricas-pro.component.html',
  styleUrls: ['./metricas-pro.component.css']
})
export class MetricasProComponent implements OnInit {

  //Variables públicas para asignar valores del select
  public planObj: any;
  public planid: string;
  public plandsc: string;

  public proyectoObj: any;
  public proyectoid: string;
  public proyectodsc: string;

  public metricaObj: any;
  public metricaid: string;
  public metricadsc: string;

  public selectedValuePla: any= "Seleccione un plan";//Valiable asignada para no mostrar el select vacío
  public selectedValueProyec: any= "Seleccione un proyecto";//Valiable asignada para no mostrar el select vacío
  public selectedValueMetrica: any= "Seleccione una métrica";//Valiable asignada para no mostrar el select vacío
  public selectedValueProducto: any= "Seleccione un producto";//Valiable asignada para no mostrar el select vacío

  private ProyectoI: ProyectoInterface[];

  //Inyección de servicios
  constructor(private modalService: NgbModal,
    private planService: PlanService,
    private proyectoservice: ProyectoService,
    private metricaService: MetricaService) { }

    //Consulta por default
  ngOnInit() {
    this.loadPlanes();
  }

  //Consulta todos los planes
  planes: PlanViewModel[] = [];
  loadPlanes() {
      this.planService.getPlanes().subscribe(response => {
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

    //Consulta proyectos por plan
    getListProyectos(){
      this.proyectoservice.getAllProyectos(this.selectedValuePla).subscribe(response => {
        this.ProyectoI = response;
      })
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
    
    //Funcion para asignar variables provenientes del select del plan
    verPla(valuePla){
      console.log("Objeto plan",valuePla);
      this.planObj = valuePla;
      this.planid = this.planObj.idP;
      this.plandsc = this.planObj.plandsc;
      console.log("planid ",this.planid);
      console.log("plandsc ",this.plandsc);
      this.getListProyectos();
      this.loadMetricas();
      return valuePla;
    }

    //Funcion para asignar variables provenientes del select del proyecto
    verProyec(valueProyec){
      console.log("Objeto proyecto",valueProyec);
      this.proyectoObj = valueProyec;
      this.proyectoid = this.proyectoObj.idP;
      this.proyectodsc = this.proyectoObj.proyectodsc;
      console.log("poryectoid ",this.proyectoid);
      console.log("proyecto ",this.proyectodsc);
      return valueProyec;
    }

    //Funcion para asignar variables provenientes del select de metricas
    verMetricas(valueMetrica){
      console.log("Objeto metrica",valueMetrica);
      this.metricaObj = valueMetrica;
      this.metricaid = this.metricaObj.id;
      this.metricadsc = this.metricaObj.metricadsc;
      console.log("metricaid ",this.metricaid);
      console.log("metrica ",this.metricadsc);
      return valueMetrica;
    }

}
