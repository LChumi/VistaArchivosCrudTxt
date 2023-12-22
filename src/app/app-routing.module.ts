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
