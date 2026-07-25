import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias implements OnInit {

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

    // Define que a pesquisa será feita pelo campo "nome"
    this.dataSource.filterPredicate = (categoria: Categoria, filtro: string) => {
      return categoria.nome.toLowerCase().includes(filtro);
    };
  }

  listarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (dados: Categoria[]) => {
        this.dataSource.data = dados;
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
  }

}