import { Component, Input  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideHeart, LucideShoppingCart } from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LucideHeart, LucideShoppingCart],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() cantidadCarrito = 0;
}