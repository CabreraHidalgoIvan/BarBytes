import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarPersonaComponent } from './components/agregar-editar-persona/agregar-editar-persona.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListPlatosComponent } from './components/list-platos/list-platos.component';
import { ListPedidosComponent } from './components/list-pedidos/list-pedidos.component';
import { ListCategoriasComponent } from './components/list-categorias/list-categorias.component';
import { UploadComponentComponent } from './components/upload-component/upload-component.component';
import { DashboardCamareroComponent } from './components/dashboard-camarero/dashboard-camarero.component';
import { ListCamareroPedidosComponent } from './components/list-camarero-pedidos/list-camarero-pedidos.component';
import { ListCamareroPedidos2Component } from './components/list-camarero-pedidos2/list-camarero-pedidos2.component';
import { ListCamareroPedidos3Component } from './components/list-camarero-pedidos3/list-camarero-pedidos3.component';
import { ListCamareroPedidos4Component } from './components/list-camarero-pedidos4/list-camarero-pedidos4.component';




const routes: Routes = [
  {path:'', component: DashboardComponent },
  {path:'dashboard-admin', component: DashboardComponent },
  {path:'dashboard-camareros', component: DashboardCamareroComponent },
  {path:'listado-usuarios', component: ListPersonasComponent },
  {path:'listado-platos', component: ListPlatosComponent },
  {path:'listado-pedidos', component: ListPedidosComponent },
  {path:'listado-categorias', component: ListCategoriasComponent },
  {path:'listado-mesa1', component: ListCamareroPedidosComponent },
  {path:'listado-mesa2', component: ListCamareroPedidos2Component },
  {path:'listado-mesa3', component: ListCamareroPedidos3Component },
  {path:'listado-mesa4', component: ListCamareroPedidos4Component },
  {path:'upload', component: UploadComponentComponent },

  {path:'**', redirectTo:'', pathMatch:'full' }, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
