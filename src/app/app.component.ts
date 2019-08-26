import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AMPlatformLite';
  items;

  constructor(db: AngularFirestore) {
    console.log("dentro"); //jNb2F1W6VegKRTEJwWbJ7z674rr2
    const usuario =  db.collection('/users').valueChanges();
    usuario.forEach(element => {
      console.log("users"+element);
      console.log(element);
    });

    this.items = db.collection('/corporativos').valueChanges();
    this.items.forEach(element => {
      console.log(element);
    });
  }
}
