import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { EstadoInterface } from '../../../models/estado';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private afs: AngularFirestore) {
    this.estadoCollection = afs.collection<EstadoInterface>('estado');
    this.estados = this.estadoCollection.valueChanges();
  }

  private estadoCollection: AngularFirestoreCollection<EstadoInterface>;
  private estados: Observable<EstadoInterface[]>;
  private estadoDoc: AngularFirestoreDocument<EstadoInterface>;
  private estado: Observable<EstadoInterface>;
  public selectedEstado: EstadoInterface = {
    idestado: null
  };

  getAllEstados() {
    return this.estados = this.estadoCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as EstadoInterface;
        data.idestado = action.payload.doc.id;
        return data;
      });
    }));
  };

  addEstado(estado: EstadoInterface): void {
    this.estadoCollection.add(estado);
  };

  updateEstado(estado: EstadoInterface): void {
    let idestado = estado.idestado;
    this.estadoDoc = this.afs.doc<EstadoInterface>(`estado/${idestado}`);
    this.estadoDoc.update(estado);
  };

  deleteEstado(idestado: string): void {
    this.estadoDoc = this.afs.doc<EstadoInterface>(`estado/${idestado}`);
    this.estadoDoc.delete();
  };
}
