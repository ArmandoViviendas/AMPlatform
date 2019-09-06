import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de estado*/
import { EstadoInterface } from '../../../models/estado';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador  map */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  /** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.estadoCollection = afs.collection<EstadoInterface>('estado');
    this.estados = this.estadoCollection.valueChanges();
  }

  /** declara variables */ 
  private estadoCollection: AngularFirestoreCollection<EstadoInterface>;
  private estados: Observable<EstadoInterface[]>;
  private estadoDoc: AngularFirestoreDocument<EstadoInterface>;
  private estado: Observable<EstadoInterface>;
  /** declaracion de variable para mmodificar */
  public selectedEstado: EstadoInterface = {
    idestado: null
  };

  /** funcion para obtener los estados */
  getAllEstados() {
    /** se asigna el resultado a la variable estados */
    return this.estados = this.estadoCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as EstadoInterface;
        data.idestado = action.payload.doc.id;
        return data;
      });
    }));
  };

  /** funcion para agregar el estado */
  addEstado(estado: EstadoInterface): void {
    this.estadoCollection.add(estado);
  };

  /** funcion para modificar estado */
  updateEstado(estado: EstadoInterface): void {
    let idestado = estado.idestado;
    this.estadoDoc = this.afs.doc<EstadoInterface>(`estado/${idestado}`);
    this.estadoDoc.update(estado);
  };

  /** funcion para eliminar estado */
  deleteEstado(idestado: string): void {
    this.estadoDoc = this.afs.doc<EstadoInterface>(`estado/${idestado}`);
    this.estadoDoc.delete();
  };
}
