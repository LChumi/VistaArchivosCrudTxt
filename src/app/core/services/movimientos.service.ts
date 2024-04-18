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
    const options ={
      params: {detalle:detalle}
    }
    return this.http.get<Movimiento>(`${this.baseUrl}buscar/narancay/${id}/`,options)
  }

  listarNarancay():Observable<Movimiento[]>{
    return this.http.get<Movimiento[]>(`${this.baseUrl}listar/narancay`)
  }

  agregarProductoNarancay(id: number, detalle: string ,productoMov: ProductoMov):Observable<Movimiento>{
    const options ={
      params: {detalle:detalle}
    }
    return this.http.put<Movimiento>(`${this.baseUrl}agregarProducto/narancay/${id}/`,productoMov,options)
  }

  eliminarProductoNarancay(id:number,detalle:string,productoMov: ProductoMov):Observable<Movimiento>{
    const options ={
      params: {detalle:detalle},
      body:productoMov
    }
    return this.http.delete<Movimiento>(`${this.baseUrl}eliminarProducto/narancay/${id}/`,options)
  }

  excelMovNarancay(movimiento:Movimiento):Observable<Blob>{
    return this.http.post(`${this.baseUrl}exportar/excel/narancay`,movimiento,{responseType: 'blob'})
  }

  guardarZhucay(movimineto : Movimiento):Observable<Movimiento>{
    return this.http.post<Movimiento>(`${this.baseUrl}guardar/zhucay`,movimineto)
  }

  buscarZhucay(id:number,detalle:string):Observable<Movimiento>{
    const options ={
      params: {detalle:detalle}
    }
    return this.http.get<Movimiento>(`${this.baseUrl}buscar/zhucay/${id}/`,options)
  }

  listarZhucay():Observable<Movimiento[]>{
    return this.http.get<Movimiento[]>(`${this.baseUrl}listar/zhucay`)
  }

  agregarProductoZhucay(id: number, detalle: string ,productoMov: ProductoMov):Observable<Movimiento>{
    const options ={
      params: {detalle:detalle}
    }
    return this.http.put<Movimiento>(`${this.baseUrl}agregarProducto/zhucay/${id}/`,productoMov,options)
  }

  eliminarProductoZhucay(id:number,detalle:string,productoMov: ProductoMov):Observable<Movimiento>{
    const options ={
      params: {detalle:detalle},
      body:productoMov

    }
    return this.http.delete<Movimiento>(`${this.baseUrl}eliminarProducto/zhucay/${id}/`,options)
  }

  excelMovZhucay(movimiento:Movimiento):Observable<Blob>{
    return this.http.post(`${this.baseUrl}exportar/excel/zhucay`,movimiento,{responseType: 'blob'})
  }

}
