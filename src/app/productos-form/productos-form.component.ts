import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReference } from '@angular/fire/firestore';
import { ProductoViewModel } from '../models/producto-view-model';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-producto-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  productoForm: FormGroup; //Variable necesaria para la creación de un modal
  createMode: boolean = true;//Variable para indicar si el titulo del modal sera de creación o de edición
  producto: ProductoViewModel; //Interfaz para creación o modificación del registro según el caso

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private productoService: ProductoService) { }

    //Validadores (valores de llanado obligatorio)  
  ngOnInit() {
    this.productoForm = this.formBuilder.group({
      productodsc: ['', Validators.required],
      sku: ['', Validators.required],
      image: ['', Validators.required],
      activo: ['', Validators.required]
            });

    if (!this.createMode) {
      this.loadProducto(this.producto); 
    }
  }

  //Carga de la información en caso de edición
  loadProducto(producto){
    this.productoForm.patchValue(producto)
  }

  //Funcion encargada la recibir valores del select y ejecución del servicio
  saveProducto(marcaid:string,marcadsc: string,planid: string,plandsc: string) {
    if (this.productoForm.invalid) {
      return;
    }

    //Caso creación de registro
    if (this.createMode){
      let producto: Producto = this.productoForm.value;
      producto.marcaid = marcaid;
      producto.marcadsc = marcadsc;
      producto.planid = planid;
      producto.plandsc = plandsc;
      this.productoService.saveProducto(producto)
      .then(response => this.handleSuccessfulSaveProducto(response, producto))
      .catch(err => console.error(err));
    }
    //Caso edición de registro  
    else{
      let producto: ProductoViewModel = this.productoForm.value;
      producto.id = this.producto.id;
      this.productoService.editProducto(producto)
        .then(() => this.handleSuccessfulEditProducto(producto))
        .catch(err => console.error(err));
    }

  }
  handleSuccessfulSaveProducto(response: DocumentReference, producto: Producto) {
    this.activeModal.dismiss({ producto: producto, id: response.id, createMode: true });
  }

  handleSuccessfulEditProducto(producto: ProductoViewModel) {
    this.activeModal.dismiss({ producto: producto, id: producto.id, createMode: false });
  }




}
