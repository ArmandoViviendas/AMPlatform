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

}
