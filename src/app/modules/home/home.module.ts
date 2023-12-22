import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './components/login/login.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FontAwesomeModule,
        FormsModule
    ]
})
export class HomeModule { }
