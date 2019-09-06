import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de ciudad*/
import { CiudadInterface } from '../../../models/ciudad';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador map */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  /** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.ciudadCollection = afs.collection<CiudadInterface>('ciudad');
    this.ciudades = this.ciudadCollection.valueChanges();
  }


  /** declara variables */
  private ciudadCollection: AngularFirestoreCollection<CiudadInterface>;
  private ciudades: Observable<CiudadInterface[]>;
  private ciudadDoc: AngularFirestoreDocument<CiudadInterface>;
  private ciudad: Observable<CiudadInterface>;
  /** declaracion de variable para modificar */
  public selectedCiudad: CiudadInterface = {
    idciudad: null,
  };

  /** declaracion de variables de la tabla foranea */
  public idestado: string;
  public estadodsc: string;

  /** funcion para obtener todas las ciudades */
  getAllCiudades(ciudad: any) {
    /** se asignan los valores de la tabla foranea */
    this.idestado = ciudad.idestado;
    this.estadodsc = ciudad.estadodsc;
    /** se asigna el resultado a la variable ciudades */
    return this.ciudades = this.ciudadCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as CiudadInterface;
        data.idciudad = action.payload.doc.id;
        return data;
        /** se filtra los resultados de la tabla */
      }).filter (item => item.idestado == ciudad.idestado);
    }));
  };

  /** funcion para agregar ciudades */
  addCiudad(ciudad: CiudadInterface): void {
    /** se asignan los valores de las tabla foranea */
    ciudad.idestado = this.idestado;
    ciudad.estadodsc = this.estadodsc;
    this.ciudadCollection.add(ciudad);
  };

  /** funcion para modificar ciudades */
  updateCiudad(ciudad: CiudadInterface): void {
    let idciudad = ciudad.idciudad;
    this.ciudadDoc = this.afs.doc<CiudadInterface>(`ciudad/${idciudad}`);
    this.ciudadDoc.update(ciudad);
  };

  /** funcion para eliminar ciudades */
  deleteCiudad(idciudad: string): void {
    this.ciudadDoc = this.afs.doc<CiudadInterface>(`ciudad/${idciudad}`);
    this.ciudadDoc.delete();
  };
}
