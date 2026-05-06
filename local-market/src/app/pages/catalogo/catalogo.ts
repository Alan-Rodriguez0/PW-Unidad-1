import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  busqueda = '';
  categoriaSeleccionada = 'Todos';

  productos = [
    {
      nombre: 'Canasta de frutas',
      vendedor: 'Frutería López',
      precio: 120,
      categoria: 'Alimentos',
      imagen: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500',
    },
    {
      nombre: 'Audífonos Bluetooth',
      vendedor: 'TecnoShop',
      precio: 450,
      categoria: 'Tecnología',
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    },
    {
      nombre: 'Camisa de lino',
      vendedor: 'Moda Local',
      precio: 280,
      categoria: 'Ropa',
      imagen: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500',
    },
    {
      nombre: 'Maceta artesanal',
      vendedor: 'Artesanías del Pueblo',
      precio: 150,
      categoria: 'Hogar',
      imagen: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
    },
    {
      nombre: 'Laptop HP',
      vendedor: 'CompuMarket',
      precio: 8500,
      categoria: 'Tecnología',
      imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    },
    {
      nombre: 'Zapatos deportivos',
      vendedor: 'Sport Center',
      precio: 650,
      categoria: 'Deportes',
      imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    },
  ];

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
}
