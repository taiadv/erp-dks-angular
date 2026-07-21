import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css'
})
export class DashboardCard {

  @Input() titulo = '';

  @Input() valor = '';

  @Input() icone = '';

  @Input() variacao = '';

}