/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HttpClientModule} from "@angular/common/http";
import { ConfirmacionDialogComponent } from './components/notification/confirmacion-dialog/confirmacion-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {WebcamModule} from 'ngx-webcam';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {MatButton} from "@angular/material/button";
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ConfirmacionDialogComponent
  ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        HttpClientModule,
        AppRoutingModule,
        MatDialogModule,
        WebcamModule,
        ZXingScannerModule,
        MatButton
    ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
