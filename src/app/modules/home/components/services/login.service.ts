/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
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
