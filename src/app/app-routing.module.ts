import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component';
import { LoginComponent} from './login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { EditarPersonalComponent } from './editar-personal/editar-personal.component';
import { CorporativoComponent } from './corporativo/corporativo.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PlanComponent } from './plan/plan.component';
import { ProyectoComponent } from './proyecto/proyecto.component';

const routes: Routes = [
  {path: '', component:LoginComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent} ,
  {path: 'EditarPersonal', component:EditarPersonalComponent},
  {path: 'Corporativo', component:CorporativoComponent},
  {path: 'Cliente', component:ClienteComponent},
  {path: 'Plan', component:PlanComponent},
  {path: 'Proyecto', component:ProyectoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
