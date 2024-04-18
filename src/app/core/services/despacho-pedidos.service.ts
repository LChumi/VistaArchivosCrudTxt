import { Injectable } from '@angular/core';
import {API_URL} from "../constants/constatns";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pedido} from "../models/Pedido";

@Injectable({
  providedIn: 'root'
})
export class DespachoPedidosService {

  private baseUrl=API_URL+'pedidos/'

  constructor(private http:HttpClient) { }

  listarPedidos(pedido_interno:number):Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.baseUrl}/listar/${pedido_interno}`);
  }
}
