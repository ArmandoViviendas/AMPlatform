import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de cliente*/
import { FormatoInterface } from '../../../models/formato';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador map */

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  /** declaracion de variable conectadas con la coleccion de la base */

  constructor(private afs: AngularFirestore) {
    this.formatoCollection = afs.collection<FormatoInterface>('formato');
    this.formatos = this.formatoCollection.valueChanges();
  }

   /** declara variables */

  private formatoCollection: AngularFirestoreCollection<FormatoInterface>;
  private formatos: Observable<FormatoInterface[]>;
  private formatoDoc: AngularFirestoreDocument<FormatoInterface>;
  private formato: Observable<FormatoInterface>;
  /** declaracion de variable para modificar */

  public selectedFormato: FormatoInterface = {
    idformato: null,
  };

  /** declaracion de variables de la tabla foranea */
  public idcadena: string;
  public cadenadsc: string;

  /** funcion para obtener todos los formatos */
  getAllFormatos(cadena: any) {
    /** se asignan los valores de la tabla foranea */
    this.idcadena = cadena.idcadena;
    this.cadenadsc = cadena.cadenadsc;
    /** se asigna el resultado a la variable formatos */
    return this.formatos = this.formatoCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */

      return changes.map(action => {
        const data = action.payload.doc.data() as FormatoInterface;
        data.idformato = action.payload.doc.id;
        return data;
        /** se filtra los resultados de la tabla */

      }).filter (item => item.idcadena == cadena.idcadena);
    }));
  };

  /** funcion para agregar formato */
  addFormato(formato: FormatoInterface): void {
    /** se asignan los valores de las tabla foranea */

    formato.idcadena = this.idcadena;
    formato.cadenadsc = this.cadenadsc;
    this.formatoCollection.add(formato);
  };

  /** funcion para modificar formato */

  updateFormato(formato: FormatoInterface): void {
    let idformato = formato.idformato;
    this.formatoDoc = this.afs.doc<FormatoInterface>(`formato/${idformato}`);
    this.formatoDoc.update(formato);
  };
  
  /** funcion para eliminar formato */

  deleteFormato(idformato: string): void {
    this.formatoDoc = this.afs.doc<FormatoInterface>(`formato/${idformato}`);
    this.formatoDoc.delete();
  };

}
