import {inject, Injectable} from '@angular/core';
import {API_URL} from "../constants/constatns";
import {ConsignacionRequest} from "../models/consignacion-request";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsignacionService {

  private baseUrl = API_URL + 'consignacion/';
  private http = inject(HttpClient);

  constructor() { }

  generarConsignacion(request: ConsignacionRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/generar`, request, { responseType: 'text' });
  }

}
