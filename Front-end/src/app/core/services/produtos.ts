import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class Produtos {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  buscarProdutos() {
    return this.http.get<any[]>(`${this.api}/produtos`);
  }

  removerProduto(pedidoId: number, produtoId: number) {
    return this.http.delete(`${this.api}/deletarProdutoPedido/${pedidoId}`, {
      body: {
        produtoId: produtoId,
      },
      responseType: 'text',
    });
  }
  adicionarProduto(pedidoId: number, produtoId: number) {
    return this.http.post(
      `${this.api}/adicionarProdutoPedido/${pedidoId}`,
      {
        produtoId,
      },
      { responseType: 'text' },
    );
  }
}
