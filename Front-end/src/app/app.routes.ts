import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { ListaPedidos } from './features/pages/lista-pedidos/lista-pedidos';
import { CriarPedido } from './features/pages/criar-pedido/criar-pedido';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pedidos', component: ListaPedidos },
  { path: 'criarPedido', component: CriarPedido },
];
