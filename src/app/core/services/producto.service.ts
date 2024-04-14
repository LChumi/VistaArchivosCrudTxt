/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
 */

import { Injectable } from '@angular/core';
import { API_URL } from '../constants/constatns';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

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
}
