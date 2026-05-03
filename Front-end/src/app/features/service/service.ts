import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private api = 'http://localhost:3000'

  constructor(private http: HttpClient){}

  getPedidos(){
    return this.http.get(`${this.api}/pedidos`)
  }

  criarPedido(data: any){
    return this.http.post(`${this.api}/criarPedido`, data)
  }
}
