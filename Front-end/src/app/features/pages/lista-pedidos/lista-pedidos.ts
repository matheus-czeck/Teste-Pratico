import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../../../core/services/pedidos';
import { Produtos } from '../../../core/services/produtos';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    MultiSelectModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css',
})
export class ListaPedidos implements OnInit {
  pedidos$!: Observable<any[]>;
  produtos$!: Observable<any[]>;

  exibirModal: boolean = false;
  pedidoSelecionado: any;
  produtoIdSelecionado: number | null = null;

  constructor(
    private pedidosService: Pedidos,
    private produtosService: Produtos,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }
  carregarPedidos() {
    this.pedidos$ = this.pedidosService.listarPedidos();
  }

  excluirPedido(id: number) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      this.pedidosService.deletarPedido(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Pedido removido!',
          });
          this.carregarPedidos();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Falha ao remover pedido.`,
          });
        },
      });
    }
  }

  removerProduto(pedidoId: number, produtoId: number) {
    this.produtosService.removerProduto(pedidoId, produtoId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto removido!',
        });
        this.carregarPedidos();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Falha ao remover produto.`,
        });
      },
    });
  }

  abrirModalAdicionar(pedido: any) {
    this.produtos$ = this.produtosService.buscarProdutos();
    this.pedidoSelecionado = pedido;
    this.produtoIdSelecionado = null;
    this.exibirModal = true;
  }

  adicionarProdutos() {
    if (this.pedidoSelecionado && this.produtoIdSelecionado) {
      const idProduto = Number(this.produtoIdSelecionado);
      console.log(idProduto);
      this.produtosService.adicionarProduto(this.pedidoSelecionado.id, idProduto).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Pedido adicionado!',
          });
          this.exibirModal = false;
          this.carregarPedidos();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Falha ao adicionar produto`,
          });
        },
      });
    }
  }

  getPedidoTotal(pedido: any): number {
    if (!pedido.produtos) return 0;
    return pedido.produtos.reduce(
      (total: number, item: any) => total + (item.produto?.preco || 0),
      0,
    );
  }
}
