/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'Cumpleaños',
    children:[
      {
        path:'inicio',
        loadChildren:() => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path:'observaciones',
        loadChildren:() => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path:'',
        redirectTo:'inicio',
        pathMatch:'full'
      },
      {
        path:'**',
        redirectTo:'inicio'
      }
    ]
  },
  {
    path:'',
    redirectTo:'Cumpleaños/',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
