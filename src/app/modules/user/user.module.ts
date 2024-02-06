import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ObservacionesComponent } from './components/observaciones/observaciones.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import { FiltroColorPipe } from './components/observaciones/pipes/filtro-color.pipe';
import { BodegasComponent } from './components/bodegas/bodegas.component';
import { ObservacionesNarancayComponent } from './components/observaciones-narancay/observaciones-narancay.component';


@NgModule({
  declarations: [
    ObservacionesComponent,
    FiltroColorPipe,
    BodegasComponent,
    ObservacionesNarancayComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
