import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AMPlatformLite';
  public items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    console.log("dentro");
    this.items = db.collection('/corporativos').valueChanges();
    this.items.forEach(element => {
      console.log(element);
    });
  }
}
