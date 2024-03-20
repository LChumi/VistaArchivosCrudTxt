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
}
