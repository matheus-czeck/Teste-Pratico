import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Pedidos {
  private api = "http://localhost:3000"

  constructor(private http: HttpClient){}

  listarPedidos(){
    return this.http.get<any[]>(`${this.api}/pedidos`)
  }

  criarPedido(data: any){
    return this.http.post(`${this.api}/criarPedido`, data)
  }

  deletarPedido(id: number){
    return this.http.delete(`${this.api}/deletarPedido/${id}`, {
      responseType: 'text'
    })
  }

}
