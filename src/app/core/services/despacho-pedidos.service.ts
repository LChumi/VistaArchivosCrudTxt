/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

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
    return this.http.get<Pedido[]>(`${this.baseUrl}listar/${pedido_interno}`);
  }
}
