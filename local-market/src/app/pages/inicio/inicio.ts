import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  slideActual = 0;

  slides = [
    {
      etiqueta: 'OFERTA ESPECIAL',
      titulo: 'Frutas y verduras frescas',
      texto: 'Hasta 20% de descuento en productos locales.',
      imagen: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900',
    },
    {
      etiqueta: 'PRODUCTOS LOCALES',
      titulo: 'Compra cerca de tu comunidad',
      texto: 'Apoya a pequeños vendedores y negocios locales.',
      imagen: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900',
    },
    {
      etiqueta: 'ARTESANÍAS',
      titulo: 'Hecho por manos locales',
      texto: 'Encuentra productos únicos de vendedores de tu zona.',
      imagen: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900',
    },
    {
      etiqueta: 'MODA LOCAL',
      titulo: 'Ropa y accesorios',
      texto: 'Descubre prendas y accesorios de vendedores cercanos.',
      imagen: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900',
    },
    {
      etiqueta: 'HOGAR',
      titulo: 'Productos para tu casa',
      texto: 'Encuentra artículos útiles para tu hogar.',
      imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900',
    },
  ];

  constructor() {
    setInterval(() => {
      this.siguienteSlide();
    }, 5000);
  }

  siguienteSlide() {
    this.slideActual = (this.slideActual + 1) % this.slides.length;
  }

  anteriorSlide() {
    this.slideActual =
      this.slideActual === 0 ? this.slides.length - 1 : this.slideActual - 1;
  }

  irSlide(index: number) {
    this.slideActual = index;
  }
}
