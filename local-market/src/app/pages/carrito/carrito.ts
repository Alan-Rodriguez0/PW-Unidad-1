import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  productos = [
    {
      nombre: 'Canasta de frutas',
      vendedor: 'Frutería López',
      precio: 120,
      cantidad: 1,
      imagen: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500',
    },
    {
      nombre: 'Audífonos Bluetooth',
      vendedor: 'TecnoShop',
      precio: 450,
      cantidad: 1,
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    },
  ];

  aumentar(producto: any) {
    producto.cantidad++;
  }

  disminuir(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  eliminar(index: number) {
    this.productos.splice(index, 1);
  }

  get subtotal() {
    return this.productos.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  }

  get envio() {
    return this.productos.length > 0 ? 30 : 0;
  }

  get total() {
    return this.subtotal + this.envio;
  }
}