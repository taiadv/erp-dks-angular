import { Component } from '@angular/core';

import { DashboardCard } from './components/dashboard-card/dashboard-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {}