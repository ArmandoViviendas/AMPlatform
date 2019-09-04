import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan';
import { PlanViewModel } from '../models/plan-view-model';

 
@Injectable({
  providedIn: 'root'
})
export class PlanService {
 
  constructor(private db: AngularFirestore) { }
 
  private planCollectionName = 'plan';
 
  getPlanes(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Plan>(this.planCollectionName).get();
  }

  savePlan(plan: Plan): Promise<DocumentReference> {
    return this.db.collection(this.planCollectionName).add(plan);
  }
  editPlan(plan: PlanViewModel): Promise<void>{
    return this.db.collection(this.planCollectionName).doc(plan.id).update(plan);
  }
  editPlanPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.planCollectionName).doc(id).update(obj);
  }
  deletePlan(idPlan: string): Promise<void>{
    return this.db.collection(this.planCollectionName).doc(idPlan).delete();
  }
}
