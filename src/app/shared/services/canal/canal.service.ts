import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { CanalInterface } from '../../../models/canal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanalService {

  constructor(private afs: AngularFirestore) { 
    this.canalCollection = afs.collection<CanalInterface>('canal');
    this.canales = this.canalCollection.valueChanges();
  }

  private canalCollection: AngularFirestoreCollection<CanalInterface>;
  private canales: Observable<CanalInterface[]>;
  private canalDoc: AngularFirestoreDocument<CanalInterface>;
  private canal: Observable<CanalInterface>;
  public selectedCanal: CanalInterface = {
    idcanal: null
  };

  getAllCanales() {
    return this.canales = this.canalCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as CanalInterface;
        data.idcanal = action.payload.doc.id;
        return data;
      });
    }));
  };

  addCanal(canal: CanalInterface): void {
    this.canalCollection.add(canal);
  };
  updateCanal(canal: CanalInterface): void {
    let idcanal = canal.idcanal;
    this.canalDoc = this.afs.doc<CanalInterface>(`canal/${idcanal}`);
    this.canalDoc.update(canal);
  };
  deleteCanal(idcanal: string): void {
    this.canalDoc = this.afs.doc<CanalInterface>(`canal/${idcanal}`);
    this.canalDoc.delete();
  };
}