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
 
  private metricaCollectionName = 'metrica';
 
  getMetricas(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Metrica>(this.metricaCollectionName).get();
  }

  getMetricasPorPlan(planid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Metrica>(this.metricaCollectionName, ref => ref.where('planid', "==" ,planid)).get();
  }

  saveMetrica(metrica: Metrica): Promise<DocumentReference> {
    return this.db.collection(this.metricaCollectionName).add(metrica);
  }
  editMetrica(metrica: MetricaViewModel): Promise<void>{
    return this.db.collection(this.metricaCollectionName).doc(metrica.id).update(metrica);
  }
  editMetricaPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.metricaCollectionName).doc(id).update(obj);
  }
  deleteMetrica(idMetrica: string): Promise<void>{
    return this.db.collection(this.metricaCollectionName).doc(idMetrica).delete();
  }

}
