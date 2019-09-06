import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de componente*/
import { CInterface } from '../../../models/corporativo';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador  map */
import { map } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class CorporativoService {

  /** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.corporativoCollection = afs.collection<CInterface>('corporativo');
    this.corporativos = this.corporativoCollection.valueChanges();
  }

  /** declara variables*/
  private corporativoCollection: AngularFirestoreCollection<CInterface>;
  private corporativos: Observable<CInterface[]>;
  private corporativoDoc: AngularFirestoreDocument<CInterface>;
  private corporativo: Observable<CInterface>;
  /** declaracion de variable para mmodificar */
  public selectedCorporativo: CInterface = {
    idCorporativo: null
  };

  /** funcion para obtener los corporativos */
  getAllCorporativos() {
    /** se asigna el resultado a la variable corporativos */
    return this.corporativos = this.corporativoCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as CInterface;
        data.idCorporativo = action.payload.doc.id;
        return data;
      });
    }));
  };

  /** funcion para agregar corporativos */
  addCorporativo(corporativo: CInterface): void {
    this.corporativoCollection.add(corporativo);
  };

  /** funcion para modificar corporativos */
  updateCorporativo(corporativo: CInterface): void {
    let idCorporativo = corporativo.idCorporativo;
    this.corporativoDoc = this.afs.doc<CInterface>(`corporativo/${idCorporativo}`);
    this.corporativoDoc.update(corporativo);
  };

  /** funcion para eliminar corporativos */
  deleteCorporativo(idCorporativo: string): void {
    this.corporativoDoc = this.afs.doc<CInterface>(`corporativo/${idCorporativo}`);
    this.corporativoDoc.delete();
  };
}
