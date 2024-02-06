import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObservacionesComponent} from "./components/observaciones/observaciones.component";
import {BodegasComponent} from "./components/bodegas/bodegas.component";
import { ObservacionesNarancayComponent } from './components/observaciones-narancay/observaciones-narancay.component';

const routes: Routes = [
  {path:'bodegas', component:BodegasComponent},
  {path:'zhucay',component:ObservacionesComponent},
  {path:'narancay',component:ObservacionesNarancayComponent},
  {path:'',redirectTo:'bodegas',pathMatch:'full'},
  {path:'**',redirectTo:'bodegas'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
