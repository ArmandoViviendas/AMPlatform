import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Metricaproyectoproducto } from '../models/metricaproyectoproducto';
import { MetricaproyectoproductoViewModel } from '../models/metricaproyectoproducto-view-model';

 
@Injectable({
  providedIn: 'root'
})
export class MetricaproyectoproductoService {
 
  constructor(private db: AngularFirestore) { }
 
  private metricaCollectionName = 'metricaproyectoproducto'; //Nombre de la colección
 
  //Obener todas las métricas
  getMetricasPP(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Metricaproyectoproducto>(this.metricaCollectionName).get();
  }
 
  //Agregar nueva metrica de forma que el id se genere de forma automatica
  saveMetricaPP(metricapp: Metricaproyectoproducto): Promise<DocumentReference> {
    return this.db.collection(this.metricaCollectionName).add(metricapp);
  }

  //Editar métrica
  editMetricaPP(metricapp: MetricaproyectoproductoViewModel): Promise<void>{
    return this.db.collection(this.metricaCollectionName).doc(metricapp.id).update(metricapp);
  }
  //Eliminar metrica
  deleteMetricaPP(idMetricapp: string): Promise<void>{
    return this.db.collection(this.metricaCollectionName).doc(idMetricapp).delete();
  }

}
