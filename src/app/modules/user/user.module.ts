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

@NgModule({
  declarations: [
    ObservacionesComponent,
    FiltroColorPipe,
    BodegasComponent,
    ObservacionesNarancayComponent,
    ObservacionesBodDaComponent
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
