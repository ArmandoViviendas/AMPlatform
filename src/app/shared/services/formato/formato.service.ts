import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormatoInterface } from '../../../models/formato';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  constructor(private afs: AngularFirestore) {
    this.formatoCollection = afs.collection<FormatoInterface>('formato');
    this.formatos = this.formatoCollection.valueChanges();
  }

  private formatoCollection: AngularFirestoreCollection<FormatoInterface>;
  private formatos: Observable<FormatoInterface[]>;
  private formatoDoc: AngularFirestoreDocument<FormatoInterface>;
  private formato: Observable<FormatoInterface>;
  public selectedFormato: FormatoInterface = {
    idformato: null,
  };

  public idcadena: string;
  public cadenadsc: string;

  getAllFormatos(cadena: any) {
    this.idcadena = cadena.idcadena;
    this.cadenadsc = cadena.cadenadsc;
    return this.formatos = this.formatoCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as FormatoInterface;
        data.idformato = action.payload.doc.id;
        return data;
      }).filter (item => item.idcadena == cadena.idcadena);
    }));
  };

  addFormato(formato: FormatoInterface): void {
    formato.idcadena = this.idcadena;
    formato.cadenadsc = this.cadenadsc;
    this.formatoCollection.add(formato);
  };

  updateFormato(formato: FormatoInterface): void {
    let idformato = formato.idformato;
    this.formatoDoc = this.afs.doc<FormatoInterface>(`formato/${idformato}`);
    this.formatoDoc.update(formato);
  };
  
  deleteFormato(idformato: string): void {
    this.formatoDoc = this.afs.doc<FormatoInterface>(`formato/${idformato}`);
    this.formatoDoc.delete();
  };
}
