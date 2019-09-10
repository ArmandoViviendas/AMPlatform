import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de cadena*/
import { CadenaInterface } from '../../../models/cadena';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador  map */

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadenaService {

  /** declaracion de variable conectadas con la coleccion de la base */

  constructor(private afs: AngularFirestore) {
    this.cadenaCollection = afs.collection<CadenaInterface>('cadena');
    this.cadenas = this.cadenaCollection.valueChanges();
  }

  /** declara variables */

  private cadenaCollection: AngularFirestoreCollection<CadenaInterface>;
  private cadenas: Observable<CadenaInterface[]>;
  private cadenaDoc: AngularFirestoreDocument<CadenaInterface>;
  private cadena: Observable<CadenaInterface>;
  /** declaracion de variable para mmodificar */

  public selectedCadena: CadenaInterface = {
    idcadena: null
  };

  /** funcion para obtener las cadenas */
  getAllCadenas() {
    /** se asigna el resultado a la variable cadenas */
    return this.cadenas = this.cadenaCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */

      return changes.map(action => {
        const data = action.payload.doc.data() as CadenaInterface;
        data.idcadena = action.payload.doc.id;
        return data;
      });
    }));
  };

  /** funcion para agregar cadena */
  addCadena(cadena: CadenaInterface): void {
    this.cadenaCollection.add(cadena);
  };

  /** funcion para modificar cadena */

  updateCadena(cadena: CadenaInterface): void {
    let idcadena = cadena.idcadena;
    this.cadenaDoc = this.afs.doc<CadenaInterface>(`cadena/${idcadena}`);
    this.cadenaDoc.update(cadena);
  };

  /** funcion para eliminar cadena */

  deleteCadena(idcadena: string): void {
    this.cadenaDoc = this.afs.doc<CadenaInterface>(`cadena/${idcadena}`);
    this.cadenaDoc.delete();
  };

}