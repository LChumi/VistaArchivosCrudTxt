import {inject, Injectable} from '@angular/core';
import {API_URL} from "../constants/constatns";
import {ConsignacionRequest} from "../models/consignacion-request";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConsignacionResponse} from "../models/consignacion-response";

@Injectable({
  providedIn: 'root'
})
export class ConsignacionService {

  private baseUrl = API_URL + 'consignacion/';
  private http = inject(HttpClient);

  constructor() { }

  generarConsignacion(request: ConsignacionRequest): Observable<ConsignacionResponse> {
    return this.http.post<ConsignacionResponse>(`${this.baseUrl}/generar`, request);
  }

}
