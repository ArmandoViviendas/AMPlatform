import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component';
import { LoginComponent} from './login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { EditarPersonalComponent } from './editar-personal/editar-personal.component';
import { CorporativoComponent } from './corporativo/corporativo.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {path: '', component:LoginComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent} ,
  {path: 'EditarPersonal', component:EditarPersonalComponent},
  {path: 'Corporativo', component:CorporativoComponent},
  {path: 'Marcas', component:MarcasComponent},
  {path: 'Productos', component:ProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
