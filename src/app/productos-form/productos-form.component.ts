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

  productoForm: FormGroup;
  createMode: boolean = true;
  producto: ProductoViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private productoService: ProductoService) { }

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

  loadProducto(producto){
    this.productoForm.patchValue(producto)
  }

  saveProducto(marcaid:string,marcadsc: string,planid: string,plandsc: string) {
    if (this.productoForm.invalid) {
      return;
    }

    if (this.createMode){
      let producto: Producto = this.productoForm.value;
      producto.marcaid = marcaid;
      producto.marcadsc = marcadsc;
      producto.planid = planid;
      producto.plandsc = plandsc;
      this.productoService.saveProducto(producto)
      .then(response => this.handleSuccessfulSaveProducto(response, producto))
      .catch(err => console.error(err));
    } else{
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
