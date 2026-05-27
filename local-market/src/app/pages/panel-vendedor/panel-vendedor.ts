import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { supabase } from '../../supabase/supabase';

@Component({
  selector: 'app-panel-vendedor',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './panel-vendedor.html',
  styleUrl: './panel-vendedor.css',
})
export class PanelVendedor {
  productos: any[] = [];
  publicando = false;
  editando = false;
productoEditandoId: number | null = null;

  nuevoProducto = {
    nombre: '',
    precio: 0,
    categoria: 'Alimentos',
    descripcion: '',
    imagen: '',
    estado: 'Activo',
  };

  constructor(private cdr: ChangeDetectorRef) {
    this.obtenerProductos();
  }

  async obtenerProductos() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) return;

    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('auth_id', user.id);

    if (error) {
      console.log(error);
      return;
    }

    this.productos = data;
    this.cdr.detectChanges();
  }

  async agregarProducto() {
    if (this.publicando) return;

    if (this.nuevoProducto.nombre.trim() === '' || this.nuevoProducto.precio <= 0) {
      alert('Completa el nombre y precio del producto');
      return;
    }

    this.publicando = true;

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) {
      alert('Debes iniciar sesión');
      this.publicando = false;
      return;
    }

    const { data: perfil } = await supabase
      .from('usuarios')
      .select('nombre')
      .eq('auth_id', user.id)
      .single();

    const { error } = await supabase
      .from('productos')
      .insert({
        nombre: this.nuevoProducto.nombre,
        precio: this.nuevoProducto.precio,
        categoria: this.nuevoProducto.categoria,
        descripcion: this.nuevoProducto.descripcion,
        imagen: this.nuevoProducto.imagen || 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500',
        auth_id: user.id,
        vendedor: perfil?.nombre || user.email,
        estado: 'Activo',
      });

    if (error) {
  console.log(error);
  alert('Error al publicar producto: ' + error.message);
  this.publicando = false;
  return;
}

this.nuevoProducto = {
  nombre: '',
  precio: 0,
  categoria: 'Alimentos',
  descripcion: '',
  imagen: '',
  estado: 'Activo',
};

await this.obtenerProductos();

this.publicando = false;
this.cdr.detectChanges();
  }

  async eliminarProducto(producto: any) {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', producto.id);

    if (error) {
      console.log(error);
      alert('Error al eliminar producto');
      return;
    }

    this.productos = this.productos.filter((p) => p.id !== producto.id);
    this.cdr.detectChanges();
  }

  editarProducto(producto: any) {
  this.editando = true;
  this.productoEditandoId = producto.id;

  this.nuevoProducto = {
    nombre: producto.nombre,
    precio: producto.precio,
    categoria: producto.categoria,
    descripcion: producto.descripcion,
    imagen: producto.imagen,
    estado: producto.estado,
  };
}
async guardarCambios() {
  if (!this.productoEditandoId) return;

  this.publicando = true;

  const { error } = await supabase
    .from('productos')
    .update({
      nombre: this.nuevoProducto.nombre,
      precio: this.nuevoProducto.precio,
      categoria: this.nuevoProducto.categoria,
      descripcion: this.nuevoProducto.descripcion,
      imagen: this.nuevoProducto.imagen,
      estado: this.nuevoProducto.estado,
    })
    .eq('id', this.productoEditandoId);

  if (error) {
    console.log(error);
    alert('Error al actualizar producto');
    this.publicando = false;
    return;
  }

  this.editando = false;
  this.productoEditandoId = null;

  this.nuevoProducto = {
    nombre: '',
    precio: 0,
    categoria: 'Alimentos',
    descripcion: '',
    imagen: '',
    estado: 'Activo',
  };

  await this.obtenerProductos();

  this.publicando = false;
  this.cdr.detectChanges();
}
}
