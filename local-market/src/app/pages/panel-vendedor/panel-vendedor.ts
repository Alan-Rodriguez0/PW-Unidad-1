import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel-vendedor',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './panel-vendedor.html',
  styleUrl: './panel-vendedor.css',
})
export class PanelVendedor {
  nuevoProducto = {
    nombre: '',
    precio: 0,
    categoria: 'Alimentos',
    descripcion: '',
    estado: 'Activo',
  };

  productos = [
    { nombre: 'Canasta de frutas', precio: 120, estado: 'Activo' },
    { nombre: 'Maceta artesanal', precio: 150, estado: 'Pendiente' },
  ];

  agregarProducto() {
    if (this.nuevoProducto.nombre.trim() === '' || this.nuevoProducto.precio <= 0) {
      alert('Completa el nombre y precio del producto');
      return;
    }

    this.productos.push({
      nombre: this.nuevoProducto.nombre,
      precio: this.nuevoProducto.precio,
      estado: this.nuevoProducto.estado,
    });

    this.nuevoProducto = {
      nombre: '',
      precio: 0,
      categoria: 'Alimentos',
      descripcion: '',
      estado: 'Activo',
    };
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }
}