import { Component } from '@angular/core';

import { DashboardCard } from './components/dashboard-card/dashboard-card';
import { SalesChart } from './components/sales-chart/sales-chart';
import { RecentOrders } from './components/recent-orders/recent-orders';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardCard,
    SalesChart,
    RecentOrders
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {}