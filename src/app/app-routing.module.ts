import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from '../app/dashboard/dashboard.component';
import { LoginComponent} from '../app/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
