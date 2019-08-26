import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from '../app/dashboard/dashboard.component';
import { LoginComponent} from '../app/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { EditarPersonalComponent } from './editar-personal/editar-personal.component';

const routes: Routes = [
  {path: '', component:LoginComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent} ,
  {path: 'EditarPersonal', component:EditarPersonalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
