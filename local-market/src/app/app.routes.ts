import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Registro } from './pages/registro/registro';
import { Login } from './pages/login/login';
import { Catalogo } from './pages/catalogo/catalogo';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { Carrito } from './pages/carrito/carrito';
import { RegistroVendedor } from './pages/registro-vendedor/registro-vendedor';
import { PanelVendedor } from './pages/panel-vendedor/panel-vendedor';
import { PanelAdmin } from './pages/panel-admin/panel-admin';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'registro', component: Registro },
  { path: 'login', component: Login },
  { path: 'catalogo', component: Catalogo },
  { path: 'producto', component: DetalleProducto },
  { path: 'carrito', component: Carrito },
  { path: 'registro-vendedor', component: RegistroVendedor },
  { path: 'panel-vendedor', component: PanelVendedor },
  { path: 'panel-admin', component: PanelAdmin },
];
