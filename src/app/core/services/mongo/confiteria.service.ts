import {inject, Injectable} from '@angular/core';
import {API_MONGO_URL} from "../../constants/constatns";
import {HttpClient} from "@angular/common/http";
import {ReposicionRequest} from "../../models/mongo/reposicion-request";
import {Observable} from "rxjs";
import {ConfiteriaRepor} from "../../models/confiteria-repor";
import {ReposicionConfiteria} from "../../models/mongo/reposicion-confiteria";

@Injectable({
  providedIn: 'root'
})
export class ConfiteriaService {

  private baseUrl = API_MONGO_URL + 'confiteria';
  private http = inject(HttpClient);

  constructor() { }

  guardarPedido(request: ReposicionRequest) : Observable<ConfiteriaRepor[]>{
    return this.http.post<ConfiteriaRepor[]>(`${this.baseUrl}/crear/detalles`, request)
  }

  listarReposiciones(fechaInicio: string, fechaFin: string): Observable<ReposicionConfiteria[]> {
    return this.http.get<ReposicionConfiteria[]>(`${this.baseUrl}/lista/reposicion`, {
      params: { fechaInicio, fechaFin }
    });
  }

  obtenerListaProductosPedidos(reposicionId : string): Observable<ConfiteriaRepor[]>{
    return this.http.get<ConfiteriaRepor[]>(`${this.baseUrl}/obtener/reposicion/${reposicionId}`)
  }

  descargarExcel(reposicionId: string, proveedor: string): Observable<void> {
    const url = `${this.baseUrl}/obtenerExcel?reposicionId=${reposicionId}`;

    return new Observable(observer => {
      this.http.get(url, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const newBlob = new Blob([blob], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(newBlob);
          link.download = `PEDIDO_${proveedor}.xlsx`;
          link.click();
          window.URL.revokeObjectURL(link.href);
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

}
