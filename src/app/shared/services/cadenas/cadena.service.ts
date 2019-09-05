import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { CadenaInterface } from '../../../models/cadena';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadenaService {

  constructor(private afs: AngularFirestore) {
    this.cadenaCollection = afs.collection<CadenaInterface>('cadena');
    this.cadenas = this.cadenaCollection.valueChanges();
  }

  private cadenaCollection: AngularFirestoreCollection<CadenaInterface>;
  private cadenas: Observable<CadenaInterface[]>;
  private cadenaDoc: AngularFirestoreDocument<CadenaInterface>;
  private cadena: Observable<CadenaInterface>;
  public selectedCadena: CadenaInterface = {
    idcadena: null
  };

  getAllCadenas() {
    return this.cadenas = this.cadenaCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as CadenaInterface;
        data.idcadena = action.payload.doc.id;
        return data;
      });
    }));
  };

  addCadena(cadena: CadenaInterface): void {
    this.cadenaCollection.add(cadena);
  };
  updateCadena(cadena: CadenaInterface): void {
    let idcadena = cadena.idcadena;
    this.cadenaDoc = this.afs.doc<CadenaInterface>(`cadena/${idcadena}`);
    this.cadenaDoc.update(cadena);
  };
  deleteCadena(idcadena: string): void {
    this.cadenaDoc = this.afs.doc<CadenaInterface>(`cadena/${idcadena}`);
    this.cadenaDoc.delete();
  };

}