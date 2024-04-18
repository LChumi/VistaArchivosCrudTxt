/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import { Injectable } from '@angular/core';
import {API_URL} from "../../../../core/constants/constatns";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../models/LoginRequest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private baseUrl:string =API_URL+'usuarios/'

  login(usuario:LoginRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl+'login',usuario);
  }

}
