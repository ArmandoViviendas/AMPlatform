import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoViewModel } from '../models/producto-view-model';

 
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
  constructor(private db: AngularFirestore) { }
 
  private productoCollectionName = 'producto'; //Nombre de la colección
 
  //Obtener todos los productos
  getProductos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Producto>(this.productoCollectionName).get();
  }


  getProductosPorPlan(planid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Producto>(this.productoCollectionName, ref => ref.where('planid', "==" ,planid)).get();
  }

  //Obtener todos los productos por marca
  //Se obtiene el valor desde producto.component.ts
  getProductosPorMarca(marcaid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Producto>(this.productoCollectionName, ref => ref.where('marcaid', "==" ,marcaid)).get();
  }

  /* Ejemplo con 2 condiciones en la consulta
  getProductosPorMarca(marcaid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Producto>(this.productoCollectionName, ref => ref.where('marcaid', "==" ,marcaid)
                                                                                .where('marcaid', "==" ,marcaid)).get();
  }
  */
  
  //Agregar nuevo producto de forma que el id se genere de forma automatica
  saveProducto(producto: Producto): Promise<DocumentReference> {
    return this.db.collection(this.productoCollectionName).add(producto);
  }

  //Editar producto
  editProducto(producto: ProductoViewModel): Promise<void>{
    return this.db.collection(this.productoCollectionName).doc(producto.id).update(producto);
  }

  //Editar solo una parte del documento
  editProductoPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.productoCollectionName).doc(id).update(obj);
  }

  //Eliminar producto
  deleteProducto(idProducto: string): Promise<void>{
    return this.db.collection(this.productoCollectionName).doc(idProducto).delete();
  }
}
