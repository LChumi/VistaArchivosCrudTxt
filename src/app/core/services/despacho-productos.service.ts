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

  listarProductos(cco:any):Observable<ProductoDespacho[]>{
    return this.http.get<ProductoDespacho[]>(`${this.baseUrl}listar/${cco}`);
  }
}
