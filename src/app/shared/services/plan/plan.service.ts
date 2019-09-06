import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de plan*/
import { PlanInterface } from '../../../models/plan';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador map */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  /** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.planCollection = afs.collection<PlanInterface>('plan');
    this.plans = this.planCollection.valueChanges();
  }

  /** declara variables*/
  private planCollection: AngularFirestoreCollection<PlanInterface>;
  private plans: Observable<PlanInterface[]>;
  private planDoc: AngularFirestoreDocument<PlanInterface>;
  private plan: Observable<PlanInterface>;
  /** declaracion de variable para modificar */
  public selectedPlan: PlanInterface = {
    idP: null
  };

  /** declaracion de variables de la tabla foranea */
  public clienteid: string;
  public clientedsc: string;

  getAllPlan(cli: any){
    /** se asignan los valores de la tabla foranea */
    this.clienteid = cli.idC;
    this.clientedsc = cli.clientedsc;
    /** se asigna el resultado a la variable plans */
    return this.plans = this.planCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as PlanInterface;
        data.idP = action.payload.doc.id;
        return data;
        /** se filtra los resultados de la tabla */
      }).filter(item => item.idcliente == cli.idC);
    }));
  }

  /** funcion para agregar plan */
  addPlan(plan: PlanInterface): void {
    /** se asignan los valores de las tabla foranea */
    plan.idcliente = this.clienteid;
    plan.clientedsc = this.clientedsc;
    this.planCollection.add(plan);
  };

  /** funcion para modificar plan */
  updatePlan(plan: PlanInterface): void {
    let idP = plan.idP;
    this.planDoc = this.afs.doc<PlanInterface>(`plan/${idP}`);
    this.planDoc.update(plan);
  };
  
  /** funcion para eliminar plan */
  deletePlan(idP: string): void {
    this.planDoc = this.afs.doc<PlanInterface>(`plan/${idP}`);
    this.planDoc.delete();
  };
} 
