import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  editando = false;

  usuario = {
    nombre: 'Eduardo López',
    correo: 'usuario@correo.com',
    telefono: '000 000 0000',
    direccion: 'Comunidad local',
    rol: 'Cliente',
  };

  cambiarModo() {
    this.editando = !this.editando;
  }
}