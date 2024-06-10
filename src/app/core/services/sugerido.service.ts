import { Injectable } from '@angular/core';
import {API_URL} from "../constants/constatns";
import {HttpClient} from "@angular/common/http";
import {SugeridoShowroom} from "../models/Sugerido";
import {Observable} from "rxjs";
import {ProductoShowroom} from "../models/ProductoShowroom";
import {Movimiento} from "../models/Movimiento";

@Injectable({
  providedIn: 'root'
})
export class SugeridoService {

  private baseUrl=API_URL+'sugerido/'

  constructor(private http:HttpClient) { }

  guardar(sugerido:SugeridoShowroom):Observable<SugeridoShowroom>{
    return this.http.post<SugeridoShowroom>(`${this.baseUrl}guardar`,sugerido)
  }

  buscarSugerido(id:number, detalle:string):Observable<SugeridoShowroom>{
    const params={
      params:{detalle:detalle}
    }
    return this.http.get<SugeridoShowroom>(`${this.baseUrl}buscar/${id}/`,params)
  }

  listar():Observable<SugeridoShowroom[]>{
    return this.http.get<SugeridoShowroom[]>(`${this.baseUrl}listar`)
  }

  agregarProducto(id: number, detalle: string , producto: ProductoShowroom):Observable<SugeridoShowroom>{
    const params ={
      params: {detalle: detalle}
    }
    return this.http.put<SugeridoShowroom>(`${this.baseUrl}agregarProducto/${id}/`,producto,params)
  }

  eliminarProducto(id:number,detalle:string,producto:ProductoShowroom):Observable<SugeridoShowroom>{
    const params ={
      params: {detalle: detalle},
      body:producto
    }
    return this.http.delete<SugeridoShowroom>(`${this.baseUrl}eliminarProducto/${id}/`,params)
  }

  excelSugerido(sugerido:SugeridoShowroom):Observable<Blob>{
    return this.http.post(`${this.baseUrl}exportar/excel`,sugerido,{responseType:'blob'})
  }

}
