import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component';
import { LoginComponent} from './login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { EditarPersonalComponent } from './editar-personal/editar-personal.component';

import { MarcasComponent } from './marcas/marcas.component';
import { ProductosComponent } from './productos/productos.component';
import { MetricasComponent } from './metricas/metricas.component';

/** corporativo */
import { CorporativoComponent } from './corporativo/corporativo.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PlanComponent } from './plan/plan.component';
import { ProyectoComponent } from './proyecto/proyecto.component';

/** tiendas */
import { CadenaComponent } from './cadena/cadena.component';
import { FormatoComponent } from './formato/formato.component';
import { CanalComponent } from './canal/canal.component';
import { EstadoComponent } from './estado/estado.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { RegionComponent } from './region/region.component';
import { TiendaComponent } from './tienda/tienda.component';

import { MetricasProComponent} from './metricas-pro/metricas-pro.component';


const routes: Routes = [
  {path: '', component:LoginComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent} ,
  {path: 'EditarPersonal', component:EditarPersonalComponent},
  {path: 'Corporativo', component:CorporativoComponent},
  {path: 'Marcas', component:MarcasComponent},
  {path: 'Productos', component:ProductosComponent},
  {path: 'Metricas', component:MetricasComponent},
  {path: 'Cliente', component:ClienteComponent},
  {path: 'Plan', component:PlanComponent},
  {path: 'Proyecto', component:ProyectoComponent},
  {path: 'MetricasProductos', component:MetricasProComponent},
  {path: 'Cadena', component:CadenaComponent},
  {path: 'Formato', component:FormatoComponent},
  {path: 'Canal', component:CanalComponent},
  {path: 'Estado', component:EstadoComponent},
  {path: 'Ciudad', component:CiudadComponent},
  {path: 'Region', component:RegionComponent},
  {path: 'Tienda', component:TiendaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
