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

  public plan: any;
  public planid: string;
  public plandsc: string;

  public selectedValue: string= "Seleccione un plan";

  

  constructor(private modalService: NgbModal,
    private marcaService: MarcaService,
    private planService: PlanService) { }

  ngOnInit() {
    this.loadPlanes();
  }

  marcas: MarcaViewModel[] = [];
    loadMarcaPorplan() {
      this.marcaService.getMarcasPorPlan(this.planid).subscribe(response => {
        this.marcas = [];
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
  

  clickAddMarca() {
    const modal = this.modalService.open(MarcasFormComponent);
    modal.componentInstance.planid = this.planid;
    modal.componentInstance.plandsc = this.plandsc;
    modal.result.then(
      this.handleModalMarcaFormClose.bind(this),
      this.handleModalMarcaFormClose.bind(this)
    )
  }

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


  handleEditClick(marca: MarcaViewModel) {
    const modal = this.modalService.open(MarcasFormComponent);
    modal.result.then(
      this.handleModalMarcaFormClose.bind(this),
      this.handleModalMarcaFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.marca = marca;
  }

  handleDeleteClick(marcaId: string, index: number) {
    this.marcaService.deleteMarca(marcaId)
      .then(() => {
        this.marcas.splice(index, 1);
      })
      .catch(err => console.error(err));
  }

  public ver(value): object {
    console.log(value);
    this.plan = value;
    this.planid = this.plan.idP;
    this.plandsc = this.plan.plandsc;
    this.loadMarcaPorplan();
    return value;
}

}
