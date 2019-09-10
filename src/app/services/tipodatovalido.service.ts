import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TipodatovalidoViewModel } from '../models/tipodatovalido-view-model';
import { Tipodatovalido } from '../models/tipodatovalido';
 
@Injectable({
  providedIn: 'root'
})
export class TipodatovalidoService {
 
  constructor(private db: AngularFirestore) { }
 
  private datoCollectionName = 'tipo_dato_valido'; //Nombre de la colección
 
  //Obtener todas los datos validos 
  getDatos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Tipodatovalido>(this.datoCollectionName).get();
  }

}
