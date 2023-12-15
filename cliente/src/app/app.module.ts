import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { AgregarEditarPersonaComponent } from './components/agregar-editar-persona/agregar-editar-persona.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListPlatosComponent } from './components/list-platos/list-platos.component';
import { AgregarEditarPlatoComponent } from './components/agregar-editar-plato/agregar-editar-plato.component';
import { ListPedidosComponent } from './components/list-pedidos/list-pedidos.component';
import { AgregarEditarPedidoComponent } from './components/agregar-editar-pedido/agregar-editar-pedido.component';
import { ListCategoriasComponent } from './components/list-categorias/list-categorias.component';
import { AgregarEditarCategoriaComponent } from './components/agregar-editar-categoria/agregar-editar-categoria.component';
import { UploadComponentComponent } from './components/upload-component/upload-component.component';
import { DashboardCamareroComponent } from './components/dashboard-camarero/dashboard-camarero.component';
import { ListCamareroPedidosComponent } from './components/list-camarero-pedidos/list-camarero-pedidos.component';
import { ListCamareroPedidos2Component } from './components/list-camarero-pedidos2/list-camarero-pedidos2.component';
import { ListCamareroPedidos3Component } from './components/list-camarero-pedidos3/list-camarero-pedidos3.component';
import { ListCamareroPedidos4Component } from './components/list-camarero-pedidos4/list-camarero-pedidos4.component';

// Componentes principales
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';






@NgModule({
  declarations: [
    AppComponent,
    ListPersonasComponent,
    AgregarEditarPersonaComponent,
    DashboardComponent,
    ListPlatosComponent,
    AgregarEditarPlatoComponent,
    ListPedidosComponent,
    AgregarEditarPedidoComponent,
    ListCategoriasComponent,
    AgregarEditarCategoriaComponent,
    UploadComponentComponent,
    DashboardCamareroComponent,
    ListCamareroPedidosComponent,
    ListCamareroPedidos2Component,
    ListCamareroPedidos3Component,
    ListCamareroPedidos4Component,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
