import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ProyectoInterface } from '../../../models/proyecto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlanInterface } from 'src/app/models/plan';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private afs: AngularFirestore) {
    this.proyectoCollection = afs.collection<ProyectoInterface>('proyecto');
    this.proyectos = this.proyectoCollection.valueChanges();
  }

  private proyectoCollection: AngularFirestoreCollection<ProyectoInterface>;
  private proyectos: Observable<ProyectoInterface[]>;
  private proyectoDoc: AngularFirestoreDocument<ProyectoInterface>;
  private proyecto: Observable<ProyectoInterface>;
  public selectedProyecto: ProyectoInterface = {
    idP: null
  };

  public clienteid: string;
  public clientedsc: string;
  public planid: string;
  public plandsc: string;

  getAllProyectos(plan: any){
    this.clienteid = plan.idcliente;
    this.clientedsc = plan.clientedsc;
    this.planid = plan.idP;
    this.plandsc = plan.plandsc;
    return this.proyectos = this.proyectoCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ProyectoInterface;
        data.idP = action.payload.doc.id;
        return data;
      }).filter(item => item.idPlan == plan.idP);
    }));
  }

  addProyecto(proyecto: ProyectoInterface): void {
    proyecto.idcliente = this.clienteid;
    proyecto.clientedsc = this.clientedsc;
    proyecto.idPlan = this.planid;
    proyecto.plandsc = this.plandsc;
    this.proyectoCollection.add(proyecto);
  };

  updateProyecto(proyecto: ProyectoInterface): void {
    let idP = proyecto.idP;
    this.proyectoDoc = this.afs.doc<ProyectoInterface>(`proyecto/${idP}`);
    this.proyectoDoc.update(proyecto);
  };
  
  deleteProyecto(idP: string): void {
    this.proyectoDoc = this.afs.doc<ProyectoInterface>(`proyecto/${idP}`);
    this.proyectoDoc.delete();
  };

}
