import { BrowserModule, ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'; //Permite usar los componentes de bootstrap

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from 'angularfire2';

import { AuthService } from "./shared/services/auth.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { EditarPersonalComponent } from './editar-personal/editar-personal.component';

import { CorporativoComponent } from './corporativo/corporativo.component';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcasFormComponent } from './marcas-form/marcas-form.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { MetricasComponent } from './metricas/metricas.component';
import { MetricasFormComponent } from './metricas-form/metricas-form.component';

import { ModalComponent } from './modal/modal.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PlanComponent } from './plan/plan.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MetricasProComponent } from './metricas-pro/metricas-pro.component';

import { CadenaComponent } from './cadena/cadena.component';
import { FormatoComponent } from './formato/formato.component';
import { CanalComponent } from './canal/canal.component';
import { EstadoComponent } from './estado/estado.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { RegionComponent } from './region/region.component';
import { TiendaComponent } from './tienda/tienda.component';
import { MetricasProFormComponent } from './metricas-pro-form/metricas-pro-form.component';
import { RutasComponent } from './rutas/rutas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxCalendarModule } from 'igniteui-angular';

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
    ProductosFormComponent,
    MetricasComponent,
    MetricasFormComponent,
    ModalComponent,
    ClienteComponent,
    PlanComponent,
    ProyectoComponent,
    MetricasProComponent,
    CadenaComponent,
    FormatoComponent,
    CanalComponent,
    EstadoComponent,
    CiudadComponent,
    RegionComponent,
    TiendaComponent,
    MetricasProFormComponent,
    RutasComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    BrowserAnimationsModule,
    IgxCalendarModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [MarcasFormComponent, ProductosFormComponent, MetricasFormComponent, MetricasProFormComponent],
})
export class AppModule {
}
