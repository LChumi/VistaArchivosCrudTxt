/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObservacionesComponent} from "./components/observaciones/observaciones.component";
import {BodegasComponent} from "./components/bodegas/bodegas.component";
import { ObservacionesNarancayComponent } from './components/observaciones-narancay/observaciones-narancay.component';
import { ObservacionesBodDaComponent } from './components/observaciones-bod-da/observaciones-bod-da.component';
import { MovimientosNarancayComponent } from './components/movimientos-narancay/movimientos-narancay.component';
import { MovimientosZhucayComponent } from './components/movimientos-zhucay/movimientos-zhucay.component';

const routes: Routes = [
  {path:'bodegas', component:BodegasComponent},
  {path:'zhucay',component:ObservacionesComponent},
  {path:'narancay',component:ObservacionesNarancayComponent},
  {path:'bod_danados',component:ObservacionesBodDaComponent},
  {path:'mov_narancay',component:MovimientosNarancayComponent},
  {path:'mov_zhucay',component:MovimientosZhucayComponent},
  {path:'',redirectTo:'bodegas',pathMatch:'full'},
  {path:'**',redirectTo:'bodegas'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
