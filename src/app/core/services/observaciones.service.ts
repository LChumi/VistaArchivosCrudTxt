/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import { Injectable } from '@angular/core';
import { API_URL } from '../constants/constatns';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observacion } from '../models/Observaciones';
import { ObservacionCorrecion } from '../models/ObservacionCorreccion';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {

  private baseUrl:string=API_URL+'observacion/';

  constructor(private http:HttpClient) { }

  /** Crud para api bodega Zhucay */
  guardarZhucay(observacion:Observacion):Observable<Observacion>{
    return this.http.post<Observacion>(this.baseUrl+'guardar/zhucay',observacion)
  }
  getObservacionesZhucay():Observable<Observacion[]>{
    return this.http.get<Observacion[]>(this.baseUrl+'listarZhucay');
  }
  agregarCorreccionZhucay(correccion:ObservacionCorrecion):Observable<Observacion>{
    return this.http.put<Observacion>(this.baseUrl+'agregarCorrecionZhucay/',correccion)
  }
  excelZhucay():Observable<Blob>{
    return this.http.get(this.baseUrl+'excel/zhucay/',{responseType:'blob'});
  }
  /** Crud para api bodega Narancay */
  guardarNarancay(observacion:Observacion):Observable<Observacion>{
    return this.http.post<Observacion>(this.baseUrl+'guardar/narancay',observacion)
  }
  getObservacionesNarancay():Observable<Observacion[]>{
    return this.http.get<Observacion[]>(this.baseUrl+'listarNarancay');
  }
  agregarCorreccionNarancay(correccion:ObservacionCorrecion):Observable<Observacion>{
    return this.http.put<Observacion>(this.baseUrl+'agregarCorrecionNarancay/',correccion)
  }
  excelNarancay():Observable<Blob>{
    return this.http.get(this.baseUrl+'excel/narancay/',{responseType:'blob'});
  }
  /** Crud para api de bod dañados */
  guardarBodDa(observacion:Observacion):Observable<Observacion>{
    return this.http.post<Observacion>(this.baseUrl+'guardar/bodDañados',observacion)
  }
  getObservacionesBodDa():Observable<Observacion[]>{
    return this.http.get<Observacion[]>(this.baseUrl+'listarBodDañados');
  }
  agregarCorreccionBodDa(correccion:ObservacionCorrecion):Observable<Observacion>{
    return this.http.put<Observacion>(this.baseUrl+'agregarCorrecionBodDañados/',correccion)
  }
  excelBodDa():Observable<Blob>{
    return this.http.get(this.baseUrl+'excel/bodDañados/',{responseType:'blob'});
  }
  /** Crud para api Gran colombia  */
  guardarGColombia(observacion:Observacion):Observable<Observacion>{
    return this.http.post<Observacion>(this.baseUrl+'guardar/gColombia',observacion)
  }
  guardarGColombia2(observacion:Observacion):Observable<Observacion>{
    return this.http.post<Observacion>(this.baseUrl+'guardar/gColombia2',observacion)
  }
  getObservacionesGColombia():Observable<Observacion[]>{
    return this.http.get<Observacion[]>(this.baseUrl+'listarGColombia');
  }
  getObservacionesGColombia2():Observable<Observacion[]>{
    return this.http.get<Observacion[]>(this.baseUrl+'listarGColombia2');
  }
  agregarCorreccionGColombia(correccion:ObservacionCorrecion):Observable<Observacion>{
    return this.http.put<Observacion>(this.baseUrl+'agregarCorrecionGColombia/',correccion)
  }
  agregarCorreccionGColombia2(correccion:ObservacionCorrecion):Observable<Observacion>{
    return this.http.put<Observacion>(this.baseUrl+'agregarCorrecionGColombia2/',correccion)
  }
  /** Crud para api Vergel */
  guardarVergel(observacion:Observacion):Observable<Observacion>{
    return this.http.post<Observacion>(this.baseUrl+'guardar/vergel',observacion)
  }
  getObservacionesVergel():Observable<Observacion[]>{
    return this.http.get<Observacion[]>(this.baseUrl+'listarVergel');
  }
  agregarCorreccionVergel(correccion:ObservacionCorrecion):Observable<Observacion>{
    return this.http.put<Observacion>(this.baseUrl+'agregarCorrecionVergel/',correccion)
  }
  excelVergel():Observable<Blob>{
    return this.http.get(this.baseUrl+'excel/vergel/',{responseType:'blob'});
  }
}
