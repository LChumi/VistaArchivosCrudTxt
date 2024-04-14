/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
 */

import { Component } from '@angular/core';
import {faChevronRight, faLock, faSquareUpRight, faUser} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router:Router,private loginService:LoginService) {
  }

  login(loginForm:NgForm){
    this.loginService.login(loginForm.value).subscribe(
      (usuario:any) =>{
        if (usuario){
          const nombres = usuario.usr_nombre.split(' ');
          const nombre = nombres[0]; // Primer nombre
          const segundoNombre = nombres.length > 2 ? nombres[2] : nombres.length > 1 ? nombres[1] : ''; // Segundo nombre, si existe
          sessionStorage.setItem("usuario", nombre + (segundoNombre ? ' ' + segundoNombre : ''));
          sessionStorage.setItem("idUsuario",String(usuario.usr_codigo))
          sessionStorage.setItem("idEmpresa",String(usuario.usr_empresa_def))
          loginForm.resetForm();
          this.goToLista()
        }
      },error => {
        alert('Credenciales Invalidas')
        loginForm.onReset()
      }
    )
  }

  goToLista(){
    this.router.navigate(['/Cumpleaños/observaciones/bodegas'])
  }

  protected readonly faUser = faUser;
  protected readonly faLock = faLock;
  protected readonly faChevronRight = faChevronRight;
  protected readonly faSquareUpRight = faSquareUpRight;
}
