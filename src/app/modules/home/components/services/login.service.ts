import { Injectable } from '@angular/core';
import {API_URL} from "../../../../core/constants/constatns";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../models/LoginRequest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private baseUrl:string =API_URL+'usuarios/'

  login(usuario:LoginRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl+'login',usuario);
  }

}
