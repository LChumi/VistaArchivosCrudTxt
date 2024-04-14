/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
 */

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private baseUrl = "http://192.168.112.36:7570/images/";

  constructor(private http: HttpClient) { }

  getImagen(imagen: any): Observable<Blob> {
    return this.http.get(this.baseUrl + imagen, { responseType: 'blob' });
  }
}
