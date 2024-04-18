/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
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
    ObservacionesVergelComponent,
    MovimientosPedidosComponent
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
