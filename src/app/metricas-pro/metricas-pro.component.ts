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
import { MetricaproyectoproductoService} from '../services/metricaproyectoproducto.service';
import { MetricaproyectoproductoViewModel } from '../models/metricaproyectoproducto-view-model';
import { DocumentReference } from 'angularfire2/firestore';
import { Metricaproyectoproducto } from '../models/metricaproyectoproducto';
import { MetricasProFormComponent } from '../metricas-pro-form/metricas-pro-form.component';

@Component({
  selector: 'app-metricas-pro',
  templateUrl: './metricas-pro.component.html',
  styleUrls: ['./metricas-pro.component.css']
})
export class MetricasProComponent implements OnInit {

  //Variables públicas para asignar valores del select
  public planObj: any; public planid: string; public plandsc: string;

  public proyectoObj: any; public proyectoid: string; public proyectodsc: string;

  public metricaObj: any; public metricaid: string; public metricadsc: string;
  public metricatipo: string;

  public productoObj: any; public productoid: string; public productodsc: string;
  public productoMarca: string;
  public productoImage: string;

  public selectedValuePla: any= "Seleccione un plan";//Valiable asignada para no mostrar el select vacío
  public selectedValueProyec: any= "Seleccione un proyecto";//Valiable asignada para no mostrar el select vacío
  public selectedValueMetrica: any= "Seleccione una métrica";//Valiable asignada para no mostrar el select vacío
  public selectedValueProducto: any= "Seleccione un producto";//Valiable asignada para no mostrar el select vacío

  private ProyectoI: ProyectoInterface[];

  //Inyección de servicios
  constructor(private modalService: NgbModal,
    private planService: PlanService,
    private proyectoservice: ProyectoService,
    private metricaService: MetricaService,
    private productoService: ProductoService,
    private metricappService: MetricaproyectoproductoService) { }

    //Consulta por default
  ngOnInit() {
    this.loadPlanes();
    this.loadMetricasPP();
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

    //Consultar productos por plan
    productos: ProductoViewModel[] = [];
    loadProductosPorPlan() {
      this.productoService.getProductosPorPlan(this.planid).subscribe(response => {
        this.productos = [];
        response.docs.forEach(value => {
          const data = value.data();
          const id = value.id;
          const producto: ProductoViewModel = {
            id: id,
            marcaid: data.marcaid,
            marcadsc: data.marcadsc,
            productodsc: data.productodsc,
            sku: data.sku,
            image: data.image,
            activo: data.activo
          };
          this.productos.push(producto);
        });
      });
    }

    //Consulta todos los planes
  metricaspp: MetricaproyectoproductoViewModel[] = [];
  loadMetricasPP() {
      this.metricappService.getMetricasPP().subscribe(response => {
        this.metricaspp = [];
        response.docs.forEach(value => {
          const data = value.data();
          const id = value.id;
          const metricapp: MetricaproyectoproductoViewModel = {
            id: id,
            proyectodsc: data.proyectodsc,
            productodsc: data.productodsc,
            metricadsc: data.metricadsc,
            datovalidotipo: data.datovalidotipo,
            datovalido: data.datovalido,
            obligatorio: data.obligatorio,
            //Valores no ocupados en tabla
            metricaid: data.metricaid,
            proyectoid: data.proyectoid,
            productoid: data.productoid,
            activo: data.activo,
            datovalidoid: data.datovalidoid,
            tipo: data.tipo,
            marca: data.marca,
            productoimg: data.productoimg
          };
          this.metricaspp.push(metricapp);
        });

        //console.log("Metricas conection",JSON.stringify(this.metricaspp)); Comparación de api

      });
    }

    //Creación de nueva asignación sin usar modal
    saveAsignacion() {
      if(this.planid != null){
        if(this.proyectoid != null){
          if (this.metricaid != null) {
            if(this.productoid != null){
                                const metricapp: MetricaproyectoproductoViewModel = {
                                metricaid: this.metricaid,
                                metricadsc: this.metricadsc,
                                proyectoid: this.proyectoid,
                                proyectodsc: this.proyectodsc,
                                productoid: this.productoid,
                                productodsc: this.productodsc,
                                datovalidotipo: "Abierta",//Antes tipoDesc
                                datovalido: "Cualquier Digito",
                                datovalidoid: "1",//Antes type
                                activo: "Activo",
                                obligatorio: "No",
                                tipo: this.metricatipo,
                                marca: this.productoMarca,
                                productoimg: this.productoImage
                                };
                                this.metricappService.saveMetricaPP(metricapp);
                                alert("Asignación de métrica correcta");
                }else{
                  alert("Debes de seleccionar un producto antes");
                }
           }else{
            alert("Debes de seleccionar una métrica antes");
           }
      }else{
        alert("Debes de seleccionar un proyecto antes");
      }   
    } else {
      alert("Debes de seleccionar un plan antes");
  }
  }

  /*Funcion que se ejecuta a cerrar el modal y dependiedo
   el valor createMode crea un nuevo documento o busca el documento a editar*/
   handleModalMetricaPPFormClose(response) {

    if (response === Object(response)) {
      if (response.createMode) {
        response.metricapp.id = response.id;
        this.metricaspp.unshift(response.metricapp);
      } else {
        let index = this.metricaspp.findIndex(value => value.id == response.id);
        this.metricaspp[index] = response.metricapp;
      }
    }
  }

  //Función encargada de abril el modal en su modo de edición
  handleEditClick(metricapp: MetricaproyectoproductoViewModel) {
    const modal = this.modalService.open(MetricasProFormComponent);
    modal.result.then(
      this.handleModalMetricaPPFormClose.bind(this),
      this.handleModalMetricaPPFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.metricapp = metricapp;
  }

  //Función para ejecutar el servicio que elimina la marca
  handleDeleteClick(metricappId: string, index: number) {
    this.metricappService.deleteMetricaPP(metricappId)
      .then(() => {
        this.metricaspp.splice(index, 1);
      })
      .catch(err => console.error(err));
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
      this.loadProductosPorPlan();
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
      this.metricatipo = this.metricaObj.tipo;
      console.log("metricaid ",this.metricaid);
      console.log("metrica ",this.metricadsc);
      return valueMetrica;
    }

    //Funcion para asignar variables provenientes del select de producto
    verProducto(valueProducto){
      console.log("Objeto producto",valueProducto);
      this.productoObj = valueProducto;
      this.productoid = this.productoObj.id;
      this.productodsc = this.productoObj.productodsc;
      this.productoMarca = this.productoObj.marcadsc;
      this.productoImage = this.productoObj.image;
      console.log("productoid ",this.productoid);
      console.log("producto ",this.productodsc);
      console.log("productoMarca ",this.productoMarca);
      console.log("productoImage ",this.productoImage);
      return valueProducto;
    }

}
