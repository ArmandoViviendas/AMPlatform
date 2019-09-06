import { Injectable } from '@angular/core';
/**importar firestrore para la base de datos*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/**importar la interface de cliente*/
import { ClienteInterface } from '../../../models/cliente';
/** importacion del obserbable (actualiza al momento de hacer un cambio del registro) */
import { Observable } from 'rxjs';
/** importacion del operador map */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

/** declaracion de variable conectadas con la coleccion de la base */
  constructor(private afs: AngularFirestore) {
    this.clienteCollection = afs.collection<ClienteInterface>('clientes');
    this.clientes = this.clienteCollection.valueChanges();
  }

  /** declara variables*/
  private clienteCollection: AngularFirestoreCollection<ClienteInterface>;
  private clientes: Observable<ClienteInterface[]>;
  private clienteDoc: AngularFirestoreDocument<ClienteInterface>;
  private cliente: Observable<ClienteInterface>;
  /** declaracion de variable para modificar */
  public selectedCliente: ClienteInterface = {
    idC: null,
  };

  /** declaracion de variables de la tabla foranea */
  public idcorporativo: string;
  public corporativodsc: string;
  
  getAllClientes(corp: any) {
    /** se asignan los valores de la tabla foranea */
    this.idcorporativo = corp.idCorporativo;
    this.corporativodsc = corp.corporativodsc;
    /** se asigna el resultado a la variable clientes */
    return this.clientes = this.clienteCollection.snapshotChanges()
    .pipe(map(changes => {
      /** recupera el id de cada dato */
      return changes.map(action => {
        const data = action.payload.doc.data() as ClienteInterface;
        data.idC = action.payload.doc.id;
        return data;
        /** se filtra los resultados de la tabla */
      }).filter(item => item.idCorporativo == corp.idCorporativo);
    }));
  };

  /** funcion para agregar clientes */
  addCliente(cliente: ClienteInterface): void {
    /** se asignan los valores de las tabla foranea */
    cliente.idCorporativo = this.idcorporativo;
    cliente.corporativodsc = this.corporativodsc;
    this.clienteCollection.add(cliente);
  };

  /** funcion para modificar clientes */
  updateCliente(cliente: ClienteInterface): void {
    let idC = cliente.idC;
    this.clienteDoc = this.afs.doc<ClienteInterface>(`clientes/${idC}`);
    this.clienteDoc.update(cliente);
  };

  /** funcion para eliminar clientes */
  deleteCliente(idC: string): void {
    this.clienteDoc = this.afs.doc<ClienteInterface>(`clientes/${idC}`);
    this.clienteDoc.delete();
  };
}
