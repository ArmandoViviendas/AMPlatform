import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de proyecto*/
import { ProyectoInterface } from '../../../models/proyecto';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador map */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  /** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.proyectoCollection = afs.collection<ProyectoInterface>('proyecto');
    this.proyectos = this.proyectoCollection.valueChanges();
  }

  /** declara variables*/
  private proyectoCollection: AngularFirestoreCollection<ProyectoInterface>;
  private proyectos: Observable<ProyectoInterface[]>;
  private proyectoDoc: AngularFirestoreDocument<ProyectoInterface>;
  private proyecto: Observable<ProyectoInterface>;
  /** declaracion de variable para modificar */
  public selectedProyecto: ProyectoInterface = {
    idP: null
  };

  /** declaracion de variables de la tabla foranea */
  public clienteid: string;
  public clientedsc: string;
  public planid: string;
  public plandsc: string;

  getAllProyectos(plan: any){
    /** se asignan los valores de la tabla foranea */
    this.clienteid = plan.idcliente;
    this.clientedsc = plan.clientedsc;
    this.planid = plan.idP;
    this.plandsc = plan.plandsc;
    /** se asigna el resultado a la variable proyectos */
    return this.proyectos = this.proyectoCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as ProyectoInterface;
        data.idP = action.payload.doc.id;
        return data;
        /** se filtra los resultados de la tabla */
      }).filter(item => item.idPlan == plan.idP);
    }));
  }

  getAllProyecto(){
    /** se asigna el resultado a la variable proyectos */
    return this.proyectos = this.proyectoCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as ProyectoInterface;
        data.idP = action.payload.doc.id;
        return data;
        /** se filtra los resultados de la tabla */
      })
    }));
  }

  /** funcion para agregar proyecto */
  addProyecto(proyecto: ProyectoInterface): void {
    /** se asignan los valores de las tabla foranea */
    proyecto.idcliente = this.clienteid;
    proyecto.clientedsc = this.clientedsc;
    proyecto.idPlan = this.planid;
    proyecto.plandsc = this.plandsc;
    this.proyectoCollection.add(proyecto);
  };

  /** funcion para modificar proyecto */
  updateProyecto(proyecto: ProyectoInterface): void {
    let idP = proyecto.idP;
    this.proyectoDoc = this.afs.doc<ProyectoInterface>(`proyecto/${idP}`);
    this.proyectoDoc.update(proyecto);
  };
  
  /** funcion para eliminar proyecto */
  deleteProyecto(idP: string): void {
    this.proyectoDoc = this.afs.doc<ProyectoInterface>(`proyecto/${idP}`);
    this.proyectoDoc.delete();
  };

}
