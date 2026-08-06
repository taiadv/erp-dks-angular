import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
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

import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto';
import { ProdutoForm } from '../produto-form/produto-form';

@Component({
  selector: 'app-produtos',
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
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource = new MatTableDataSource<Produto>();

  displayedColumns: string[] = [
    'codigo',
    'nome',
    'categoria',
    'preco',
    'estoque',
    'ativo',
    'acoes'
  ];

  carregando = false;

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.listarProdutos();

    this.dataSource.filterPredicate = (
      produto: Produto,
      filtro: string
    ) => {

      return (
        produto.nome?.toLowerCase().includes(filtro) ||
        produto.codigo?.toLowerCase().includes(filtro) ||
        produto.marca?.toLowerCase().includes(filtro) ||
        produto.categoriaNome?.toLowerCase().includes(filtro)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listarProdutos(): void {

    this.carregando = true;

    this.produtoService.listarProdutos().subscribe({

      next: (dados) => {

        this.dataSource.data = dados;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.carregando = false;
      },

      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.carregando = false;
      }

    });
  }

  aplicarFiltro(event: Event): void {

    const valor =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      valor.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  novoProduto(): void {

    const dialogRef = this.dialog.open(ProdutoForm, {
      width: '700px',
      maxWidth: '95vw',
      data: null
    });

    dialogRef.afterClosed().subscribe(resultado => {

      if (!resultado) {
        return;
      }

      console.log('Produto preenchido:', resultado);

    });
  }

}