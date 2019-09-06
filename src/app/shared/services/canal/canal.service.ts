import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de canal*/
import { CanalInterface } from '../../../models/canal';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador  map */

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanalService {

  /** declaracion de variable conectadas con la coleccion de la base */

  constructor(private afs: AngularFirestore) { 
    this.canalCollection = afs.collection<CanalInterface>('canal');
    this.canales = this.canalCollection.valueChanges();
  }

   /** declara variables */ 

  private canalCollection: AngularFirestoreCollection<CanalInterface>;
  private canales: Observable<CanalInterface[]>;
  private canalDoc: AngularFirestoreDocument<CanalInterface>;
  private canal: Observable<CanalInterface>;
  /** declaracion de variable para mmodificar */

  public selectedCanal: CanalInterface = {
    idcanal: null
  };

  /** funcion para obtener los canales */
  getAllCanales() {
    /** se asigna el resultado a la variable canales */
    return this.canales = this.canalCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */

      return changes.map(action => {
        const data = action.payload.doc.data() as CanalInterface;
        data.idcanal = action.payload.doc.id;
        return data;
      });
    }));
  };

  /** funcion para agregar canal */
  addCanal(canal: CanalInterface): void {
    this.canalCollection.add(canal);
  };

  /** funcion para modificar canal */

  updateCanal(canal: CanalInterface): void {
    let idcanal = canal.idcanal;
    this.canalDoc = this.afs.doc<CanalInterface>(`canal/${idcanal}`);
    this.canalDoc.update(canal);
  };

  /** funcion para eliminar canal */

  deleteCanal(idcanal: string): void {
    this.canalDoc = this.afs.doc<CanalInterface>(`canal/${idcanal}`);
    this.canalDoc.delete();
  };
}