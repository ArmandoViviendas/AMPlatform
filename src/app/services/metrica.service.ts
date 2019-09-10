import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Metrica } from '../models/metrica';
import { MetricaViewModel } from '../models/metrica-view-model';

 
@Injectable({
  providedIn: 'root'
})
export class MetricaService {
 
  constructor(private db: AngularFirestore) { }
 
  private metricaCollectionName = 'metrica'; //Nombre de la colección
 
  //Obener todas las métricas
  getMetricas(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Metrica>(this.metricaCollectionName).get();
  }

  //Obener todas las métricas
  //Se obtiene el valor desde metrica.component.ts
  getMetricasPorPlan(planid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Metrica>(this.metricaCollectionName, ref => ref.where('planid', "==" ,planid)).get();
  }

  /* Ejemplo con 2 condiciones en la consulta
  getMetricasPorPlan(planid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Metrica>(this.metricaCollectionName, ref => ref.where('planid', "==" ,planid)
                                                                              .where('planid', "==" ,planid)).get();
  }
  */ 
 
  //Agregar nueva metrica de forma que el id se genere de forma automatica
  saveMetrica(metrica: Metrica): Promise<DocumentReference> {
    return this.db.collection(this.metricaCollectionName).add(metrica);
  }
  //Editar métrica
  editMetrica(metrica: MetricaViewModel): Promise<void>{
    return this.db.collection(this.metricaCollectionName).doc(metrica.id).update(metrica);
  }

  //Editar solo una parte del documento
  editMetricaPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.metricaCollectionName).doc(id).update(obj);
  }

  //Eliminar metrica
  deleteMetrica(idMetrica: string): Promise<void>{
    return this.db.collection(this.metricaCollectionName).doc(idMetrica).delete();
  }

}
