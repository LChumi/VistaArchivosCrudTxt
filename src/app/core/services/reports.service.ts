import { Injectable } from '@angular/core';
import {API_URL} from "../constants/constatns";
import {HttpClient} from "@angular/common/http";
import {finalize, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl=API_URL+'reports'

  constructor(private http:HttpClient) { }

  getPdfReport(codigo: string): Observable<void> {
    const url = `${this.baseUrl}/report/pedido/pdf?pedido=${codigo}`;
    return new Observable(observer => {
      this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
        const newBlob = new Blob([blob], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(newBlob);
        link.target = '_blank'; // Abre en nueva pestaña
        link.click();
        observer.next(); // Notifica la finalización
        observer.complete(); // Completa el Observable
      }, error => {
        observer.error(error); // Maneja errores si es necesario
      });
    })
  }

  getExcelReport(codigo: string): Observable<void> {
    const url = `${this.baseUrl}/report/pedido/excel?pedido=${codigo}`;
    return new Observable(observer => {
      this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${codigo}.xlsx`; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Limpia el objeto URL
        observer.next(); // Notifica la finalización
        observer.complete(); // Completa el Observable
      }, error => {
        observer.error(error); // Maneja errores si es necesario
      });
    })
  }
}
