import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { RegionInterface } from '../../../models/region';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private afs: AngularFirestore) {
    this.regionCollection = afs.collection<RegionInterface>('region');
    this.regiones = this.regionCollection.valueChanges();
  }

  private regionCollection: AngularFirestoreCollection<RegionInterface>;
  private regiones: Observable<RegionInterface[]>;
  private regionDoc: AngularFirestoreDocument<RegionInterface>;
  private region: Observable<RegionInterface>;
  public selectedRegion: RegionInterface = {
    idregion: null
  };

  getAllRegiones() {
    return this.regiones = this.regionCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as RegionInterface;
        data.idregion = action.payload.doc.id;
        return data;
      });
    }));
  };

  addRegion(region: RegionInterface): void {
    this.regionCollection.add(region);
  };

  updateRegion(region: RegionInterface): void {
    let idregion = region.idregion;
    this.regionDoc = this.afs.doc<RegionInterface>(`region/${idregion}`);
    this.regionDoc.update(region);
  };

  deleteRegion(idregion: string): void {
    this.regionDoc = this.afs.doc<RegionInterface>(`region/${idregion}`);
    this.regionDoc.delete();
  };
}
