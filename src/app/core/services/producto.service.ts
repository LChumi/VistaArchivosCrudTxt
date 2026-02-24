/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import { Injectable } from '@angular/core';
import { API_URL } from '../constants/constatns';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';
import {ConfiteriaRepor} from "../models/confiteria-repor";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl=API_URL+'producto/'

  constructor(private http:HttpClient) { }

  getProducto(bodega:any,barraItem:any):Observable<Producto>{
    const options ={
      params: { data:barraItem}
    };

    return this.http.get<Producto>(`${this.baseUrl}BuscarProducto/${bodega}`,options);
  }

  buscarProducto(barraItem:any):Observable<Producto>{
    const options ={
      params: { data:barraItem}
    };

    return this.http.get<Producto>(`${this.baseUrl}BuscarProducto`,options);
  }

  listaConfiteria(nombre: string): Observable<ConfiteriaRepor[]>{
    return this.http.get<ConfiteriaRepor[]>(`${this.baseUrl}confiteria/${nombre}`);
  }
}
