import { BrowserModule, ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'; //Permite usar los componentes de bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from 'angularfire2';

import { AuthService } from "./shared/services/auth.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavComponent} from './nav/nav.component';
import { LoginComponent} from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { EditarPersonalComponent } from './editar-personal/editar-personal.component';
import { CorporativoComponent } from './corporativo/corporativo.component';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcasFormComponent } from './marcas-form/marcas-form.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    DashboardComponent,
    PersonalComponent,
    EditarPersonalComponent,
    CorporativoComponent,
    MarcasComponent,
    MarcasFormComponent,
    ProductosComponent,
    ProductosFormComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [MarcasFormComponent,ProductosFormComponent],
})
export class AppModule { }
