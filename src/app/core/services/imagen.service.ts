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
