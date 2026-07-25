import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './recent-orders.html',
  styleUrl: './recent-orders.css'
})
export class RecentOrders {

  displayedColumns = [
    'pedido',
    'cliente',
    'valor',
    'status'
  ];

  dataSource = [
    {
      pedido: '#1001',
      cliente: 'Maria Souza',
      valor: 'R$ 420,00',
      status: 'Pago'
    },
    {
      pedido: '#1002',
      cliente: 'Juliana Costa',
      valor: 'R$ 890,00',
      status: 'Enviado'
    },
    {
      pedido: '#1003',
      cliente: 'Fernanda Lima',
      valor: 'R$ 250,00',
      status: 'Pendente'
    }
  ];

}