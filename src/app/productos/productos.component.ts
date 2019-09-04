import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../services/producto.service';
import { ProductoViewModel } from '../models/producto-view-model';
import { ProductosFormComponent } from '../productos-form/productos-form.component';
import { MarcaService } from '../services/marca.service';
import { PlanService } from '../services/plan.service';
import { MarcaViewModel } from '../models/marca-view-model';
import { PlanViewModel } from '../models/plan-view-model';

@Component({
  selector: 'app-producto-list',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public marca: any;
  public marcaid: string;
  public marcadsc: string;
  public selectedValue: string= "Seleccione una marca";

  public plan: any;
  public planid: string;
  public plandsc: string;
  public selectedValueP: string= "Seleccione un plan";


  productos: ProductoViewModel[] = [];
  marcas: MarcaViewModel[] = [];
  planes: PlanViewModel[] = [];


  constructor(private modalService: NgbModal,
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private planService: PlanService) { }

  ngOnInit() {
    this.loadPlanes();
  }

    loadProductosPorMarca() {
      this.productoService.getProductosPorMarca(this.marcaid).subscribe(response => {
        this.productos = [];
        response.docs.forEach(value => {
          const data = value.data();
          const id = value.id;
          const producto: ProductoViewModel = {
            id: id,
            marcaid: data.marcaid,
            productodsc: data.productodsc,
            sku: data.sku,
            image: data.image,
            activo: data.activo
          };
          this.productos.push(producto);
        });
      });
    }

      loadMarcas() {
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
    

      loadPlanes() {
        this.planService.getPlanes().subscribe(response => {
          this.planes = [];
          response.docs.forEach(value => {
            const data = value.data();
            const id = value.id;
            const plan: PlanViewModel = {
              id: id,
              clienteid: data.clienteid,
              plandsc: data.plandsc,
              activo: data.activo
            };
            this.planes.push(plan);
          });
        });
      }
  

  clickAddProducto() {
    const modal = this.modalService.open(ProductosFormComponent);
    modal.componentInstance.marcaid = this.marcaid;
    modal.componentInstance.marcadsc = this.marcadsc;
    modal.componentInstance.planid = this.planid;
    modal.componentInstance.plandsc = this.plandsc;
    modal.result.then(
      this.handleModalProductoFormClose.bind(this),
      this.handleModalProductoFormClose.bind(this)
    )
  }

  handleModalProductoFormClose(response) {
    // is response an object?
    if (response === Object(response)) {
      if (response.createMode) {
        response.producto.id = response.id;
        this.productos.unshift(response.producto);
      } else {
        let index = this.productos.findIndex(value => value.id == response.id);
        this.productos[index] = response.producto;
      }
    }
  }


  handleEditClick(producto: ProductoViewModel) {
    const modal = this.modalService.open(ProductosFormComponent);
    modal.result.then(
      this.handleModalProductoFormClose.bind(this),
      this.handleModalProductoFormClose.bind(this)
    )
    modal.componentInstance.createMode = false;
    modal.componentInstance.producto = producto;
  }

  handleDeleteClick(productoId: string, index: number) {
    this.productoService.deleteProducto(productoId)
      .then(() => {
        this.productos.splice(index, 1);
      })
      .catch(err => console.error(err));
  }

  public ver(value): object {
    console.log("Objeto marca",value);
    this.marca = value;
    this.marcaid = this.marca.id;
    this.marcadsc = this.marca.marcadsc;
    this.loadProductosPorMarca();
    return value;
  }

  public verP(value): object {
    console.log("Objeto plan",value);
    this.plan = value;
    this.planid = this.plan.id;
    this.plandsc = this.plan.plandsc;
    this.loadMarcas();
    return value;
  }

}
