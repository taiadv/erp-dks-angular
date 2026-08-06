import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Produto } from '../../../models/produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoForm {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProdutoForm>,
    @Inject(MAT_DIALOG_DATA) public data: Produto | null
  ) {

    this.formulario = this.fb.group({

      codigo: [data?.codigo || ''],
      codigoBarras: [data?.codigoBarras || ''],

      nome: [
        data?.nome || '',
        Validators.required
      ],

      marca: [data?.marca || ''],
      colecao: [data?.colecao || ''],
      descricao: [data?.descricao || ''],

      custo: [data?.custo ?? 0],
      preco: [
        data?.preco ?? 0,
        Validators.required
      ],
      precoPromocional: [data?.precoPromocional ?? 0],

      estoque: [data?.estoque ?? 0],
      estoqueMinimo: [data?.estoqueMinimo ?? 0],

      ativo: [data?.ativo ?? true],

      categoriaId: [data?.categoriaId ?? null],
      fornecedorId: [data?.fornecedorId ?? null],
      corId: [data?.corId ?? null],
      tamanhoId: [data?.tamanhoId ?? null]

    });

  }

  salvar(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      id: this.data?.id,
      ...this.formulario.value
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}