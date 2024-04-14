/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
 */

import { Injectable } from '@angular/core';
import { API_URL } from '../constants/constatns';
import { HttpClient } from '@angular/common/http';
import { Movimiento } from '../models/Movimiento';
import { Observable } from 'rxjs';
import { ProductoMov } from '../models/ProductoMov';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private baseUrl:string =API_URL+'movimiento/'

  constructor(private http:HttpClient) { }

  guardarNarancay(movimineto : Movimiento):Observable<Movimiento>{
    return this.http.post<Movimiento>(`${this.baseUrl}guardar/narancay`,movimineto)
  }

  buscarNarancay(id:number,detalle:string):Observable<Movimiento>{
    return this.http.get<Movimiento>(`${this.baseUrl}buscar/narancay/${id}/${detalle}`)
  }

  listarNarancay():Observable<Movimiento[]>{
    return this.http.get<Movimiento[]>(`${this.baseUrl}listar/narancay`)
  }

  agregarProductoNarancay(id: number, detalle: string ,productoMov: ProductoMov):Observable<Movimiento>{
    return this.http.put<Movimiento>(`${this.baseUrl}agregarProducto/narancay/${id}/${detalle}`,productoMov)
  }

  excelMovNarancay(movimiento:Movimiento):Observable<Blob>{
    return this.http.post(`${this.baseUrl}exportar/excel/narancay`,movimiento,{responseType: 'blob'})
  }

  guardarZhucay(movimineto : Movimiento):Observable<Movimiento>{
    return this.http.post<Movimiento>(`${this.baseUrl}guardar/zhucay`,movimineto)
  }

  buscarZhucay(id:number,detalle:string):Observable<Movimiento>{
    return this.http.get<Movimiento>(`${this.baseUrl}buscar/zhucay/${id}/${detalle}`)
  }

  listarZhucay():Observable<Movimiento[]>{
    return this.http.get<Movimiento[]>(`${this.baseUrl}listar/zhucay`)
  }

  agregarProductoZhucay(id: number, detalle: string ,productoMov: ProductoMov):Observable<Movimiento>{
    return this.http.put<Movimiento>(`${this.baseUrl}agregarProducto/zhucay/${id}/${detalle}`,productoMov)
  }

  excelMovZhucay(movimiento:Movimiento):Observable<Blob>{
    return this.http.post(`${this.baseUrl}exportar/excel/zhucay`,movimiento,{responseType: 'blob'})
  }

}
