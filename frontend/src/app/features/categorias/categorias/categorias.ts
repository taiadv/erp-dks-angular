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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CategoriaService } from '../../../services/categoria';
import { Categoria } from '../../../models/categoria';
import { CategoriaForm } from '../categoria-form/categoria-form';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource = new MatTableDataSource<Categoria>();

  displayedColumns: string[] = [
    'id',
    'nome',
    'descricao',
    'acoes'
  ];

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.listarCategorias();

    this.dataSource.filterPredicate = (categoria: Categoria, filtro: string) => {
      return (
        categoria.nome.toLowerCase().includes(filtro) ||
        categoria.descricao.toLowerCase().includes(filtro)
      );
    };

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listarCategorias(): void {

    this.categoriaService.listarCategorias().subscribe({
      next: (dados) => {
        this.dataSource.data = dados;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
      },
      error: erro => console.error(erro)
    });

  }

  aplicarFiltro(event: Event): void {

    const valor = (event.target as HTMLInputElement).value;

    this.dataSource.filter = valor.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  novaCategoria(): void {
    this.abrirFormulario();
  }

  editarCategoria(categoria: Categoria): void {
    this.abrirFormulario(categoria);
  }

  private abrirFormulario(categoria?: Categoria): void {

    const dialogRef = this.dialog.open(CategoriaForm, {
      width: '500px',
      data: categoria
    });

    dialogRef.afterClosed().subscribe(resultado => {

      if (!resultado) {
        return;
      }

      if (resultado.id) {

        this.categoriaService.editarCategoria(resultado.id, {
          nome: resultado.nome,
          descricao: resultado.descricao
        }).subscribe({
          next: () => this.listarCategorias(),
          error: erro => console.error(erro)
        });

      } else {

        this.categoriaService.cadastrarCategoria({
          nome: resultado.nome,
          descricao: resultado.descricao
        }).subscribe({
          next: () => this.listarCategorias(),
          error: erro => console.error(erro)
        });

      }

    });

  }

}