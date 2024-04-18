/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

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
