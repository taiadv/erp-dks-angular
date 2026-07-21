import { Component } from '@angular/core';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexGrid,
  ApexTitleSubtitle
} from 'ng-apexcharts';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './sales-chart.html',
  styleUrl: './sales-chart.css'
})
export class SalesChart {

  series: ApexAxisChartSeries = [
    {
      name: 'Vendas',
      data: [18, 25, 30, 28, 36, 42, 48, 55, 60, 58, 70, 82]
    }
  ];

  chart: ApexChart = {
    type: 'area',
    height: 350,
    toolbar: {
      show: false
    }
  };

  xaxis: ApexXAxis = {
    categories: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ]
  };

  stroke: ApexStroke = {
    curve: 'smooth',
    width: 3
  };

  dataLabels: ApexDataLabels = {
    enabled: false
  };

  grid: ApexGrid = {
    borderColor: '#E9ECEF'
  };

  title: ApexTitleSubtitle = {
    text: 'Vendas dos Últimos 12 Meses'
  };

}