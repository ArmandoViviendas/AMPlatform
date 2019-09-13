import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface*/
import { TiendaInterface } from '../../../models/tienda';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador map */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  /** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.tiendaCollection = afs.collection<TiendaInterface>('tienda');
    this.tiendas = this.tiendaCollection.valueChanges();
  }

  /** declara variables*/
  private tiendaCollection: AngularFirestoreCollection<TiendaInterface>;
  private tiendas: Observable<TiendaInterface[]>;
  private tiendaDoc: AngularFirestoreDocument<TiendaInterface>;
  private tienda: Observable<TiendaInterface>;
  /** declaracion de variable para modificar */
  public selectedTienda: TiendaInterface = {
    idT: null
  };

  /** declaracion de variables de la tabla foranea (select) */
  public corporativoid: string;
  public corporativodsc: string;
  public clienteid: string;
  public clientedsc: string;

  public cadenadsc: string;
  public cadenaid: string;
  getAllTiendas(cliente: any){
    /** se asignan los valores de la tabla foranea */
    this.corporativoid = cliente.idCorporativo;
    this.corporativodsc = cliente.corporativodsc;
    this.clienteid = cliente.idC;
    this.clientedsc = cliente.clientedsc;
    /** se asigna el resultado a la variable tiendas */
    return this.tiendas = this.tiendaCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as TiendaInterface;
        data.idT = action.payload.doc.id;
        return data;
        /** se filtra los resultados de la tabla */
      }).filter(item => item.idcliente == cliente.idC);
    }));
  }

  /** modal rutas */
  getAllTienda(){
    /** se asigna el resultado a la variable tiendas */
    return this.tiendas = this.tiendaCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as TiendaInterface;
        data.idT = action.payload.doc.id;
        return data;
        /** se filtra los resultados de la tabla */
      })
    }));
  }

  /** funcion para agregar tienda */
  addTienda(tienda: TiendaInterface): void {
    /** se asignan los valores de las tabla foranea */
    tienda.idCorporativo = this.corporativoid;
    tienda.corporativodsc = this.corporativodsc;
    tienda.idcliente = this.clienteid;
    tienda.clientedsc = this.clientedsc;

    this.tiendaCollection.add(tienda);
  };

  /** funcion para modificar tienda */
  updateTienda(tienda: TiendaInterface): void {
    let idT = tienda.idT;
    this.tiendaDoc = this.afs.doc<TiendaInterface>(`tienda/${idT}`);
    this.tiendaDoc.update(tienda);
    
  };

  /** funcion para eliminar tienda */
  deleteTienda(idT: string): void {
    this.tiendaDoc = this.afs.doc<TiendaInterface>(`tienda/${idT}`);
    this.tiendaDoc.delete();
  };
}
