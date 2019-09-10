import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcaService } from '../services/marca.service';
import { MarcaViewModel } from '../models/marca-view-model';
import { MarcasFormComponent } from '../marcas-form/marcas-form.component';
import { PlanViewModel } from '../models/plan-view-model';
import { PlanService } from '../services/plan.service';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  //Variables públicas para asignar valores del select
  public plan: any;
  public planid: string;
  public plandsc: string;

  //Valiable asignada para no mostrar el select vacío
  public selectedValue: string= "Seleccione un plan";

  
  //Inyección de servicios
  constructor(private modalService: NgbModal,
    private marcaService: MarcaService,
    private planService: PlanService) { }

  //Consulta por default
  ngOnInit() {
    this.loadPlanes();
  }

  //Consulta marcas por plan
  marcas: MarcaViewModel[] = [];
    loadMarcaPorplan() {
      this.marcaService.getMarcasPorPlan(this.planid).subscribe(response => {
        //Hacemos la petición al servidor
        this.marcas = [];
        //Recorremos el arreglo 
        response.docs.forEach(value => {
          const data = value.data();
          const id = value.id;
          const marca: MarcaViewModel = {
            id: id,
            planid: data.planid,
            marcadsc: data.marcadsc,
            propiacompetencia: data.propiacompetencia,
            activo: data.activo
          };
          this.marcas.push(marca);
        });
      });
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
  
  //Función encargada de abril el modal en su modo de creación
  clickAddMarca() {
    const modal = this.modalService.open(MarcasFormComponent);
    //Variables obtenidas del select mandadas al modal
    modal.componentInstance.planid = this.planid;
    modal.componentInstance.plandsc = this.plandsc;
    modal.result.then(
      this.handleModalMarcaFormClose.bind(this),
      this.handleModalMarcaFormClose.bind(this)
    )
  }

  /*Funcion que se ejecuta a cerrar el modal y dependiedo
   el valor createMode crea un nuevo documento o busca el documento a editar*/
  handleModalMarcaFormClose(response) {

    if (response === Object(response)) {
      if (response.createMode) {
        response.marca.id = response.id;
        this.marcas.unshift(response.marca);
      } else {
        let index = this.marcas.findIndex(value => value.id == response.id);
        this.marcas[index] = response.marca;
      }
    }
  }

  //Función encargada de abril el modal en su modo de edición
  handleEditClick(marca: MarcaViewModel) {
    const modal = this.modalService.open(MarcasFormComponent);
    modal.result.then(
      this.handleModalMarcaFormClose.bind(this),
      this.handleModalMarcaFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.marca = marca;
  }

  //Función para ejecutar el servicio que elimina la marca
  handleDeleteClick(marcaId: string, index: number) {
    this.marcaService.deleteMarca(marcaId)
      .then(() => {
        this.marcas.splice(index, 1);
      })
      .catch(err => console.error(err));
  }

  //Funcion para asignar variables provenientes del select del plan
  public ver(value): object {
    console.log(value);
    this.plan = value;
    this.planid = this.plan.idP;
    this.plandsc = this.plan.plandsc;
    this.loadMarcaPorplan();
    return value;
}

}
