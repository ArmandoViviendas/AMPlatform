import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { CInterface } from '../../../models/corporativo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class CorporativoService {

  constructor(private afs: AngularFirestore) {
    this.corporativoCollection = afs.collection<CInterface>('corporativo');
    this.corporativos = this.corporativoCollection.valueChanges();
  }

  private corporativoCollection: AngularFirestoreCollection<CInterface>;
  private corporativos: Observable<CInterface[]>;
  private corporativoDoc: AngularFirestoreDocument<CInterface>;
  private corporativo: Observable<CInterface>;
  public selectedCorporativo: CInterface = {
    idC: null
  };

  getAllCorporativos() {
    return this.corporativos = this.corporativoCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as CInterface;
        data.idC = action.payload.doc.id;
        return data;
      });
    }));
  };

  addCorporativo(corporativo: CInterface): void {
    this.corporativoCollection.add(corporativo);
  };
  updateCorporativo(corporativo: CInterface): void {
    let idC = corporativo.idC;
    this.corporativoDoc = this.afs.doc<CInterface>(`corporativo/${idC}`);
    this.corporativoDoc.update(corporativo);
  };
  deleteCorporativo(idC: string): void {
    this.corporativoDoc = this.afs.doc<CInterface>(`corporativo/${idC}`);
    this.corporativoDoc.delete();
  };
}
