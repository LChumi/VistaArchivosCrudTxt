/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
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
