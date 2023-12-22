import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObservacionesComponent} from "./components/observaciones/observaciones.component";

const routes: Routes = [
  {path:'lista',component:ObservacionesComponent},
  {path:'',redirectTo:'lista',pathMatch:'full'},
  {path:'**',redirectTo:'lista'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
