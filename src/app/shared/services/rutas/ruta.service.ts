import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface*/
import { RutaInterface } from '../../../models/rutas';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador map */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  /** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.rutaCollection = afs.collection<RutaInterface>('rutas');
    this.rutas = this.rutaCollection.valueChanges();
  }

  /** declara variables*/
  private rutaCollection: AngularFirestoreCollection<RutaInterface>;
  private rutas: Observable<RutaInterface[]>;
  private rutaDoc: AngularFirestoreDocument<RutaInterface>;
  private ruta: Observable<RutaInterface>;
  /** declaracion de variable para modificar */
  public selectedRuta: RutaInterface = {
    idR: null
  };

  /** funcion para obtener los corporativos */
  getAllRutas() {
    /** se asigna el resultado a la variable corporativos */
    return this.rutas = this.rutaCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as RutaInterface;
        data.idR = action.payload.doc.id;
        return data;
      });
    }));
  };

  /** funcion para agregar rutas */
  addRuta(ruta: RutaInterface): void {
    this.rutaCollection.add(ruta);
  };

  /** funcion para modificar ruta */
  updateRuta(ruta: RutaInterface): void {
    let idR = ruta.idR;
    this.rutaDoc = this.afs.doc<RutaInterface>(`rutas/${idR}`);
    this.rutaDoc.update(ruta);
  };

  /** funcion para eliminar ruta */
  deleteRuta(idR: string): void {
    this.rutaDoc = this.afs.doc<RutaInterface>(`rutas/${idR}`);
    this.rutaDoc.delete();
  };
}
