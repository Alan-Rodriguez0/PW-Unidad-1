import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin {
  solicitudes = [
    {
      negocio: 'Abarrotes López',
      responsable: 'Juan López',
      ubicacion: 'Centro',
      estado: 'Pendiente',
    },
    {
      negocio: 'Artesanías Mayra',
      responsable: 'Mayra Ruiz',
      ubicacion: 'Barrio Norte',
      estado: 'Pendiente',
    },
  ];

  aprobar(solicitud: any) {
    solicitud.estado = 'Aprobado';
  }

  rechazar(solicitud: any) {
    solicitud.estado = 'Rechazado';
  }
}