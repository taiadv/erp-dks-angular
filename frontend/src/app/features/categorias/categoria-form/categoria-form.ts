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

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css'
})
export class CategoriaForm {

  formulario: FormGroup;

  titulo = 'Nova Categoria';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoriaForm>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data?.id) {
      this.titulo = 'Editar Categoria';
    }

    this.formulario = this.fb.group({
      id: [data?.id ?? null],
      nome: [
        data?.nome ?? '',
        Validators.required
      ],
      descricao: [
        data?.descricao ?? ''
      ]
    });

  }

  salvar(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.formulario.value);

  }

  cancelar(): void {
    this.dialogRef.close();
  }

}