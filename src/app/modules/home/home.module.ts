/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './components/login/login.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FontAwesomeModule,
        FormsModule
    ]
})
export class HomeModule { }
