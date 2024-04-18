import { Injectable } from '@angular/core';
import { API_URL } from '../constants/constatns';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespachoProductoService {

  private baseUrl=API_URL+'despacho_producto/'

  constructor(private http:HttpClient) { }

  getProductosDespacho(pedido_interno: number):Observable
}
