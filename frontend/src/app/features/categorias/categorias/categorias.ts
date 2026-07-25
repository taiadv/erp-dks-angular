import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { CategoriaService } from '../../../services/categoria';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Categoria>();

  displayedColumns: string[] = [
    'id',
    'nome',
    'descricao',
    'acoes'
  ];

  constructor(
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.listarCategorias();

    this.dataSource.filterPredicate = (categoria: Categoria, filtro: string) => {
      return categoria.nome.toLowerCase().includes(filtro);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  listarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (dados: Categoria[]) => {
        this.dataSource.data = dados;
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias', erro);
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}