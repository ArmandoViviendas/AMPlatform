import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from 'angularfire2';

import { AuthService } from "./shared/services/auth.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderComponent} from './header/header.component';
import { NavComponent} from './nav/nav.component';
import { FooterComponent} from './footer/footer.component';
import { LoginComponent} from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { EditarPersonalComponent } from './editar-personal/editar-personal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    PersonalComponent,
    EditarPersonalComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
