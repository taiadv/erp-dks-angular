import { Component } from '@angular/core';

import { DashboardCard } from './components/dashboard-card/dashboard-card';
import { SalesChart } from './components/sales-chart/sales-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardCard,
    SalesChart
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {}