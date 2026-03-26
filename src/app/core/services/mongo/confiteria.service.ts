import {inject, Injectable} from '@angular/core';
import {API_MONGO_URL} from "../../constants/constatns";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfiteriaService {

  private baseUrl = API_MONGO_URL + 'confiteria/';
  private http = inject(HttpClient);

  constructor() { }

  guardarPedido(){

  }

}
