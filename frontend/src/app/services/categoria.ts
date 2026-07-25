import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly API = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API);
  }

  cadastrarCategoria(categoria: Omit<Categoria, 'id'>): Observable<Categoria> {
    return this.http.post<Categoria>(this.API, categoria);
  }

  editarCategoria(id: number, categoria: Omit<Categoria, 'id'>): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.API}/${id}`, categoria);
  }

  excluirCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}