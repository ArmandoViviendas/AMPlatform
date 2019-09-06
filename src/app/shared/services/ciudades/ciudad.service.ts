import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { CiudadInterface } from '../../../models/ciudad';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private afs: AngularFirestore) {
    this.ciudadCollection = afs.collection<CiudadInterface>('ciudad');
    this.ciudades = this.ciudadCollection.valueChanges();
  }

  private ciudadCollection: AngularFirestoreCollection<CiudadInterface>;
  private ciudades: Observable<CiudadInterface[]>;
  private ciudadDoc: AngularFirestoreDocument<CiudadInterface>;
  private ciudad: Observable<CiudadInterface>;
  public selectedCiudad: CiudadInterface = {
    idciudad: null,
  };

  public idestado: string;
  public estadodsc: string;

  getAllCiudades(ciudad: any) {
    this.idestado = ciudad.idestado;
    this.estadodsc = ciudad.estadodsc;
    return this.ciudades = this.ciudadCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as CiudadInterface;
        data.idciudad = action.payload.doc.id;
        return data;
      }).filter (item => item.idestado == ciudad.idestado);
    }));
  };

  addCiudad(ciudad: CiudadInterface): void {
    ciudad.idestado = this.idestado;
    ciudad.estadodsc = this.estadodsc;
    this.ciudadCollection.add(ciudad);
  };

  updateCiudad(ciudad: CiudadInterface): void {
    let idciudad = ciudad.idciudad;
    this.ciudadDoc = this.afs.doc<CiudadInterface>(`ciudad/${idciudad}`);
    this.ciudadDoc.update(ciudad);
  };

  deleteCiudad(idciudad: string): void {
    this.ciudadDoc = this.afs.doc<CiudadInterface>(`ciudad/${idciudad}`);
    this.ciudadDoc.delete();
  };
}
