import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de region*/
import { RegionInterface } from '../../../models/region';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador  map */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  /** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.regionCollection = afs.collection<RegionInterface>('region');
    this.regiones = this.regionCollection.valueChanges();
  }

  /** declara variables */ 
  private regionCollection: AngularFirestoreCollection<RegionInterface>;
  private regiones: Observable<RegionInterface[]>;
  private regionDoc: AngularFirestoreDocument<RegionInterface>;
  private region: Observable<RegionInterface>;
  /** declaracion de variable para mmodificar */
  public selectedRegion: RegionInterface = {
    idregion: null
  };

  /** funcion para obtener las regiones*/
  getAllRegiones() {
    /** se asigna el resultado a la variable regiones */
    return this.regiones = this.regionCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as RegionInterface;
        data.idregion = action.payload.doc.id;
        return data;
      });
    }));
  };

  /** funcion para agregar region */
  addRegion(region: RegionInterface): void {
    this.regionCollection.add(region);
  };

  /** funcion para modificar region */
  updateRegion(region: RegionInterface): void {
    let idregion = region.idregion;
    this.regionDoc = this.afs.doc<RegionInterface>(`region/${idregion}`);
    this.regionDoc.update(region);
  };

  /** funcion para eliminar estaado */
  deleteRegion(idregion: string): void {
    this.regionDoc = this.afs.doc<RegionInterface>(`region/${idregion}`);
    this.regionDoc.delete();
  };
}
