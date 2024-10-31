import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Empleado} from "../models/empleado";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private baseUrl= "http://192.168.112.245:8081";

  http = inject(HttpClient);

  constructor() { }

  getEmpleado(usuarioId: string): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.baseUrl}/models/empleado/id-usuario/${usuarioId}`)
  }

  sendString(data: string, email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.post<boolean>(`${this.baseUrl}/recp/string`, data, { params })
      .pipe(
        catchError(error => {
          console.error('Error sending string:', error);
          return of(false); // Retorna false en caso de error
        })
      );
  }

  sendFile(file: File, email: string): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    return this.http.post<boolean>(`${this.baseUrl}/recp/file`, formData)
      .pipe(
        catchError(error => {
          console.error('Error sending file:', error);
          return of(false); // Retorna false en caso de error
        })
      );
  }


}
