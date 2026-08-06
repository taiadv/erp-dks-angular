import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produto, ProdutoRequest } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  cadastrarProduto(produto: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  editarProduto(
    id: number,
    produto: ProdutoRequest
  ): Observable<Produto> {
    return this.http.put<Produto>(
      `${this.API}/${id}`,
      produto
    );
  }

  excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.API}/${id}`
    );
  }
}