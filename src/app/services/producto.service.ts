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
 
  private productoCollectionName = 'producto';
 
  getProductos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Producto>(this.productoCollectionName).get();
  }

  getProductosPorMarca(marcaid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Producto>(this.productoCollectionName, ref => ref.where('marcaid', "==" ,marcaid)).get();
  }
  
  saveProducto(producto: Producto): Promise<DocumentReference> {
    return this.db.collection(this.productoCollectionName).add(producto);
  }
  editProducto(producto: ProductoViewModel): Promise<void>{
    return this.db.collection(this.productoCollectionName).doc(producto.id).update(producto);
  }
  editProductoPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.productoCollectionName).doc(id).update(obj);
  }
  deleteProducto(idProducto: string): Promise<void>{
    return this.db.collection(this.productoCollectionName).doc(idProducto).delete();
  }
}
