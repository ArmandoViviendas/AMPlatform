import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { PlanInterface } from '../../../models/plan';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private afs: AngularFirestore) {
    this.planCollection = afs.collection<PlanInterface>('plan');
    this.plans = this.planCollection.valueChanges();
  }

  private planCollection: AngularFirestoreCollection<PlanInterface>;
  private plans: Observable<PlanInterface[]>;
  private planDoc: AngularFirestoreDocument<PlanInterface>;
  private plan: Observable<PlanInterface>;
  public selectedPlan: PlanInterface = {
    idP: null
  };

  public clienteid: string;
  public clientedsc: string;

  getAllPlan(cli: any){
    this.clienteid = cli.idC;
    this.clientedsc = cli.clientedsc;
    return this.plans = this.planCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as PlanInterface;
        data.idP = action.payload.doc.id;
        return data;
      }).filter(item => item.idcliente == cli.idC);
    }));
  }

  addPlan(plan: PlanInterface): void {
    plan.idcliente = this.clienteid;
    plan.clientedsc = this.clientedsc;
    this.planCollection.add(plan);
  };

  updatePlan(plan: PlanInterface): void {
    let idP = plan.idP;
    this.planDoc = this.afs.doc<PlanInterface>(`plan/${idP}`);
    this.planDoc.update(plan);
  };
  
  deletePlan(idP: string): void {
    this.planDoc = this.afs.doc<PlanInterface>(`plan/${idP}`);
    this.planDoc.delete();
  };
} 
