import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { first, tap } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService,public afAuth: AngularFireAuth) { }

  ngOnInit() {
    //localStorage.removeItem('user');
    //localStorage.clear();
    console.log(localStorage.getItem('user'));
    /*console.log(console.log(this.authService.isLoggedIn));*/
    this.authService.GetTheCurrentUser();

    //console.log(user);

    /*user.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });*/
  }

}
