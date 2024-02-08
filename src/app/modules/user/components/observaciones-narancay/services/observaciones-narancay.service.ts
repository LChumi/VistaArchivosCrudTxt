import { Injectable } from '@angular/core';
import { API_URL } from '../../../../../core/constants/constatns';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observacion } from '../../../../../core/models/Observaciones';
import { ObservacionCorrecion } from '../../../../../core/models/ObservacionCorreccion';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesNarancayService {

  private baseUrl:string= API_URL+'observacion_narancay/';

  constructor(private http:HttpClient) { }

  getObservaciones():Observable<Observacion[]>{
    return this.http.get<Observacion[]>(this.baseUrl+'listar');
  }

  guardar(observacion:Observacion):Observable<Observacion>{
    return this.http.post<Observacion>(this.baseUrl+'guardar',observacion)
  }

  agregarCorreccion(correccion:ObservacionCorrecion):Observable<Observacion>{
    return this.http.put<Observacion>(this.baseUrl+'agregarCorrecion/',correccion)
  }

  descargarExcel():Observable<Blob>{
    return this.http.get(this.baseUrl+'exportar/excel',{responseType:'blob'});
  }

}
