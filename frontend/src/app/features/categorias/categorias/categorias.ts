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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
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

  carregando = false;

  displayedColumns: string[] = [
    'id',
    'nome',
    'descricao',
    'acoes'
  ];

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.listarCategorias();

    this.dataSource.filterPredicate = (
      categoria: Categoria,
      filtro: string
    ) => {

      const nome = categoria.nome?.toLowerCase() || '';
      const descricao = categoria.descricao?.toLowerCase() || '';

      return (
        nome.includes(filtro) ||
        descricao.includes(filtro)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listarCategorias(): void {

    this.carregando = true;

    this.categoriaService.listarCategorias().subscribe({

      next: (dados) => {

        this.dataSource.data = dados;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.carregando = false;

        this.cdr.detectChanges();
      },

      error: (erro) => {

        console.error('Erro ao carregar categorias:', erro);

        this.carregando = false;

        this.mostrarMensagem(
          'Erro ao carregar as categorias.'
        );
      }

    });
  }

  aplicarFiltro(event: Event): void {

    const valor = (event.target as HTMLInputElement).value;

    this.dataSource.filter = valor
      .trim()
      .toLowerCase();

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

  excluirCategoria(categoria: Categoria): void {

    const confirmar = window.confirm(
      `Deseja realmente excluir a categoria "${categoria.nome}"?`
    );

    if (!confirmar) {
      return;
    }

    this.carregando = true;

    this.categoriaService
      .excluirCategoria(categoria.id)
      .subscribe({

        next: () => {

          this.mostrarMensagem(
            'Categoria excluída com sucesso!'
          );

          this.listarCategorias();
        },

        error: (erro) => {

          console.error(
            'Erro ao excluir categoria:',
            erro
          );

          this.carregando = false;

          this.mostrarMensagem(
            'Não foi possível excluir a categoria.'
          );
        }

      });
  }

  private abrirFormulario(categoria?: Categoria): void {

    const dialogRef = this.dialog.open(
      CategoriaForm,
      {
        width: '500px',
        maxWidth: '95vw',
        data: categoria
      }
    );

    dialogRef.afterClosed().subscribe(resultado => {

      if (!resultado) {
        return;
      }

      if (resultado.id) {

        this.editar(
          resultado.id,
          resultado.nome,
          resultado.descricao
        );

      } else {

        this.cadastrar(
          resultado.nome,
          resultado.descricao
        );

      }

    });
  }

  private cadastrar(
    nome: string,
    descricao: string
  ): void {

    this.carregando = true;

    this.categoriaService
      .cadastrarCategoria({
        nome,
        descricao
      })
      .subscribe({

        next: () => {

          this.mostrarMensagem(
            'Categoria cadastrada com sucesso!'
          );

          this.listarCategorias();
        },

        error: (erro) => {

          console.error(
            'Erro ao cadastrar categoria:',
            erro
          );

          this.carregando = false;

          this.mostrarMensagem(
            'Não foi possível cadastrar a categoria.'
          );
        }

      });
  }

  private editar(
    id: number,
    nome: string,
    descricao: string
  ): void {

    this.carregando = true;

    this.categoriaService
      .editarCategoria(
        id,
        {
          nome,
          descricao
        }
      )
      .subscribe({

        next: () => {

          this.mostrarMensagem(
            'Categoria atualizada com sucesso!'
          );

          this.listarCategorias();
        },

        error: (erro) => {

          console.error(
            'Erro ao atualizar categoria:',
            erro
          );

          this.carregando = false;

          this.mostrarMensagem(
            'Não foi possível atualizar a categoria.'
          );
        }

      });
  }

  private mostrarMensagem(
    mensagem: string
  ): void {

    this.snackBar.open(
      mensagem,
      'Fechar',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );
  }

}