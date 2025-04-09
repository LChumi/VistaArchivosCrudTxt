/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ObservacionesComponent } from './components/observaciones/observaciones.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import { FiltroColorPipe } from './components/observaciones/pipes/filtro-color.pipe';
import { BodegasComponent } from './components/bodegas/bodegas.component';
import { ObservacionesNarancayComponent } from './components/observaciones-narancay/observaciones-narancay.component';
import { WebcamModule } from 'ngx-webcam';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ObservacionesBodDaComponent } from './components/observaciones-bod-da/observaciones-bod-da.component';
import { MovimientosZhucayComponent } from './components/movimientos-zhucay/movimientos-zhucay.component';
import { MovimientosNarancayComponent } from './components/movimientos-narancay/movimientos-narancay.component';
import { ObservacionesGColombiaComponent } from './components/observaciones-gcolombia/observaciones-gcolombia.component';
import { ObservacionesVergelComponent } from './components/observaciones-vergel/observaciones-vergel.component';
import { MovimientosPedidosComponent } from './components/movimientos-pedidos/movimientos-pedidos.component';
import { SugeridosComponent } from './components/sugeridos/sugeridos.component';
import { ObservacionesGColombia2Component} from "./components/observaciones-gcolombia2/observaciones-gcolombia2.component";

@NgModule({
  declarations: [
    ObservacionesComponent,
    FiltroColorPipe,
    BodegasComponent,
    ObservacionesNarancayComponent,
    ObservacionesBodDaComponent,
    MovimientosZhucayComponent,
    MovimientosNarancayComponent,
    ObservacionesGColombiaComponent,
    ObservacionesGColombia2Component,
    ObservacionesVergelComponent,
    MovimientosPedidosComponent,
    SugeridosComponent
  ],
  exports: [
    FiltroColorPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    UserRoutingModule,
    FormsModule,
    WebcamModule,
    ZXingScannerModule
  ]
})
export class UserModule { }
