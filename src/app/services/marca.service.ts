import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MarcaViewModel } from '../models/marca-view-model';
import { Marca } from '../models/marca';
 
@Injectable({
  providedIn: 'root'
})
export class MarcaService {
 
  constructor(private db: AngularFirestore) { }
 
  private marcaCollectionName = 'marca'; //Nombre de la colección
 
  //Obtener todas las marcas
  getMarcas(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Marca>(this.marcaCollectionName).get();
  }

  //Obtener todas las marcas por plan
  //Se obtiene el valor desde marca.component.ts
  getMarcasPorPlan(planid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Marca>(this.marcaCollectionName, ref => ref.where('planid', "==" ,planid)).get();
  }
  
  /* Ejemplo con 2 condiciones en la consulta
   getMarcasPorPlan(planid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Marca>(this.marcaCollectionName, ref => ref.where('planid', "==" ,planid)
                                                                         .where('planid', "==" ,planid))
                                                                         .get();
  }
  */ 

  //Agregar una marca de forma que el id se genere de forma automatica
  saveMarca(marca: Marca): Promise<DocumentReference> {
    return this.db.collection(this.marcaCollectionName).add(marca);
  }
  //Editar una marca
  editMarca(marca: MarcaViewModel): Promise<void>{
    return this.db.collection(this.marcaCollectionName).doc(marca.id).update(marca);
  }

  //Editar solo una parte del documento
  editMarcaPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.marcaCollectionName).doc(id).update(obj);
  }
  //Eliminar marca
  deleteMarca(idMarca: string): Promise<void>{
    return this.db.collection(this.marcaCollectionName).doc(idMarca).delete();
  }
}
