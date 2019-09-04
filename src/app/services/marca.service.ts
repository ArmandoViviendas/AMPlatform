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
 
  private marcaCollectionName = 'marca';
 
  getMarcas(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Marca>(this.marcaCollectionName).get();
  }

  getMarcasPorPlan(planid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Marca>(this.marcaCollectionName, ref => ref.where('planid', "==" ,planid)).get();
  }

  saveMarca(marca: Marca): Promise<DocumentReference> {
    return this.db.collection(this.marcaCollectionName).add(marca);
  }
  editMarca(marca: MarcaViewModel): Promise<void>{
    return this.db.collection(this.marcaCollectionName).doc(marca.id).update(marca);
  }
  editMarcaPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.marcaCollectionName).doc(id).update(obj);
  }
  deleteMarca(idMarca: string): Promise<void>{
    return this.db.collection(this.marcaCollectionName).doc(idMarca).delete();
  }
}
