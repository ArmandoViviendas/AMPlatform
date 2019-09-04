import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ClienteInterface } from '../../../models/cliente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private afs: AngularFirestore) {
    this.clienteCollection = afs.collection<ClienteInterface>('clientes');
    this.clientes = this.clienteCollection.valueChanges();
  }

  private clienteCollection: AngularFirestoreCollection<ClienteInterface>;
  private clientes: Observable<ClienteInterface[]>;
  private clienteDoc: AngularFirestoreDocument<ClienteInterface>;
  private cliente: Observable<ClienteInterface>;
  public selectedCliente: ClienteInterface = {
    idC: null
  };
  
  getAllClientes(corp:[]) {
    return this.clientes = this.clienteCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ClienteInterface;
        data.idC = action.payload.doc.id;
        return data;
      }).filter(item => item.idCorporativo == corp.idC);
    }));
  };

  addCliente(cliente: ClienteInterface, corp: []): void {
    this.clienteCollection.add(cliente, corp);
  };
  updateCliente(cliente: ClienteInterface): void {
    let idC = cliente.idC;
    this.clienteDoc = this.afs.doc<ClienteInterface>(`clientes/${idC}`);
    this.clienteDoc.update(cliente);
  };
  deleteCliente(idC: string): void {
    this.clienteDoc = this.afs.doc<ClienteInterface>(`clientes/${idC}`);
    this.clienteDoc.delete();
  };
}
