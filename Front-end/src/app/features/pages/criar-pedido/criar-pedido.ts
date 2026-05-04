import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtos } from '../../../core/services/produtos';
import { Pedidos } from '../../../core/services/pedidos';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-criar-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MultiSelectModule, ButtonModule, InputTextModule],
  templateUrl: './criar-pedido.html',
  styleUrl: './criar-pedido.css',
})
export class CriarPedido implements OnInit {
  produtos$!: Observable<any[]>;
  formulario: FormGroup;

  constructor(
    private produtosService: Produtos,
    private fb: FormBuilder,
    private pedidosService: Pedidos,
  ) 
  
  {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      produtosSelecionados: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.produtos$ = this.produtosService.buscarProdutos();
  }

  criarPedido() {
    if (this.formulario.valid) {
      const data = {
        nome: this.formulario.value.nome,
        produtos: this.formulario.value.produtosSelecionados,
      };
      console.log(data, this.formulario)
      this.pedidosService.criarPedido(data).subscribe({
        next: (res) => {
          alert('Pedido Criado com sucesso!');
          this.formulario.reset();
        },
        error: (err) => {
          console.log(err)
          alert('Erro ao criar pedido!');
        },
      });
    }
  }
}
