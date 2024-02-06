import { Injectable } from '@angular/core';
import {API_URL} from "../../../../../core/constants/constatns";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bodega} from "../../../../../core/models/Bodega";

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  private baseUrl:string=API_URL+'bodegas/'

  constructor(private http:HttpClient) { }

  getBodegas(usuario: any, empresa: any): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(`${this.baseUrl}listaBodegas/${usuario}/${empresa}`);
  }
}
