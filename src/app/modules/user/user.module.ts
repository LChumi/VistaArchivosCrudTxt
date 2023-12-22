import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ObservacionesComponent } from './components/observaciones/observaciones.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ObservacionesComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
