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
import {ProductoDespacho} from "../models/ProductoDespacho";

@Injectable({
  providedIn: 'root'
})
export class DespachoProductosService {

  private baseUrl = API_URL+'despacho_producto/';

  constructor(private http:HttpClient) { }

  listarProductos(cco:number):Observable<ProductoDespacho[]>{
    return this.http.get<ProductoDespacho[]>(`${this.baseUrl}listar/${cco}`);
  }

  buscarProducto(cco:number,data:string):Observable<ProductoDespacho>{
    const params= {
      params: { data: data}
    }
    return this.http.get<ProductoDespacho>(`${this.baseUrl}producto/${cco}`,params)
  }
}
