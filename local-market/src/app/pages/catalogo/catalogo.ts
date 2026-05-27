import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../../components/product-card/product-card';
import { Toast } from '../../components/toast/toast';
import { LucideUser, LucideShoppingCart, LucideHeart } from '@lucide/angular';
import { CarritoService } from '../../services/carrito';
import { FavoritosService } from '../../services/favoritos';
import { supabase } from '../../supabase/supabase';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, RouterLink, FormsModule, ProductCard, Toast, LucideUser, LucideShoppingCart, LucideHeart],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

  rolUsuario = '';
  nombreUsuario = '';
  correoUsuario = '';
  busqueda = '';
  categoriaSeleccionada = 'Todos';
  mostrarToast = false;
  mensajeToast = '';

  constructor(
  public carritoService: CarritoService,
  public favoritosService: FavoritosService,
  private cdr: ChangeDetectorRef
) {
  this.obtenerRolUsuario();
  this.obtenerProductos();
}


  async obtenerRolUsuario() {
  const { data: sessionData } = await supabase.auth.getSession();

  const user = sessionData.session?.user;

  if (!user) {
    this.rolUsuario = 'usuario';
    return;
  }

  const { data: perfil, error } = await supabase
    .from('usuarios')
    .select('nombre, rol')
    .eq('auth_id', user.id)
    .maybeSingle();

  console.log('Usuario auth:', user.id);
  console.log('Perfil encontrado:', perfil);
  console.log('Error perfil:', error);

  if (error || !perfil) {
    this.rolUsuario = 'usuario';
    return;
  }

this.rolUsuario = (perfil.rol || 'usuario').trim().toLowerCase();
this.nombreUsuario = perfil.nombre || 'Usuario';
this.correoUsuario = user.email ?? '';

this.cdr.detectChanges();

  console.log('Rol final:', this.rolUsuario);
}

  productos: any[] = [];

  get productosFiltrados() {
    return this.productos.filter((producto) => {
      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        producto.vendedor.toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideCategoria =
        this.categoriaSeleccionada === 'Todos' ||
        producto.categoria === this.categoriaSeleccionada;

      return coincideBusqueda && coincideCategoria;
    });
  }

  filtrarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
  }

  agregarCarrito() {
  this.carritoService.agregarProducto();

  this.mensajeToast = 'Producto agregado al carrito';
  this.mostrarToast = true;

  setTimeout(() => {
    this.mostrarToast = false;
  }, 2500);
}

agregarFavorito() {
  this.favoritosService.agregarFavorito();

  this.mensajeToast = 'Producto agregado a favoritos';
  this.mostrarToast = true;

  setTimeout(() => {
    this.mostrarToast = false;
  }, 2500);
}

async obtenerProductos() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('estado', 'Activo');

  if (error) {
    console.log(error);
    return;
  }

  this.productos = data;
  this.cdr.detectChanges();
}
}
