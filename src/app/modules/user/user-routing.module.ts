/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObservacionesComponent} from "./components/observaciones/observaciones.component";
import {BodegasComponent} from "./components/bodegas/bodegas.component";
import { ObservacionesNarancayComponent } from './components/observaciones-narancay/observaciones-narancay.component';
import { ObservacionesBodDaComponent } from './components/observaciones-bod-da/observaciones-bod-da.component';
import { ObservacionesVergelComponent } from './components/observaciones-vergel/observaciones-vergel.component';
import { ObservacionesGColombiaComponent } from './components/observaciones-gcolombia/observaciones-gcolombia.component';
import {
  ObservacionesGColombia2Component
} from "./components/observaciones-gcolombia2/observaciones-gcolombia2.component";
import {ConfiteriaComponent} from "./components/confiteria/confiteria.component";
import {ConsignacionComponent} from "./components/consignacion/consignacion.component";

const routes: Routes = [
  {path:'bodegas', component:BodegasComponent},
  {path:'zhucay',component:ObservacionesComponent},
  {path:'narancay',component:ObservacionesNarancayComponent},
  {path:'bod_danados',component:ObservacionesBodDaComponent},
  {path:'vergel',component:ObservacionesVergelComponent},
  {path:'colombia',component:ObservacionesGColombiaComponent},
  {path:'colombia2',component:ObservacionesGColombia2Component},
  {path:'confiteria', component:ConfiteriaComponent},
  {path:'consignacion', component:ConsignacionComponent},
  {path:'',redirectTo:'bodegas',pathMatch:'full'},
  {path:'**',redirectTo:'bodegas'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
