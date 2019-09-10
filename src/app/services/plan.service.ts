import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PlanInterface } from '../models/plan';
import { PlanViewModel } from '../models/plan-view-model';

 
@Injectable({
  providedIn: 'root'
})
export class PlanService {
 
  constructor(private db: AngularFirestore) { }
 
  private planCollectionName = 'plan'; //Nombre de la colección
 
  //Obener todos los planes
  getPlanes(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<PlanInterface>(this.planCollectionName).get();
  }

  //Obener todos los planes por cliente
  //Se obtiene el valor desde plan.component.ts
  getPlanesPorCliente(planid: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<PlanInterface>(this.planCollectionName, ref => ref.where('idcliente', "==" ,planid)).get();
  }

  //Agregar nuevo plan de forma que el id se genere de forma automatica
  savePlan(plan: PlanInterface): Promise<DocumentReference> {
    return this.db.collection(this.planCollectionName).add(plan);
  }
  //Editar plan
  editPlan(plan: PlanViewModel): Promise<void>{
    return this.db.collection(this.planCollectionName).doc(plan.idP).update(plan);
  }

  //Editar solo una parte del documento
  editPlanPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.planCollectionName).doc(id).update(obj);
  }

  //Eliminar plan
  deletePlan(idPlan: string): Promise<void>{
    return this.db.collection(this.planCollectionName).doc(idPlan).delete();
  }
}
