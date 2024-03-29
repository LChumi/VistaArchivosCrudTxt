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
}
