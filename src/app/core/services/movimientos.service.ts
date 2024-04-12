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
    return this.http.post<Blob>(`exportar/excel/narancay`,movimiento)
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
    return this.http.post<Blob>(`exportar/excel/zhucay`,movimiento)
  }

}
