/*
 * Copyright (c) 2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-dialog',
  templateUrl: './confirmacion-dialog.component.html',
  styleUrls: ['./confirmacion-dialog.component.css']
})
export class ConfirmacionDialogComponent {
  nombreBodega!:string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: {nombreBodega:string}){
      this.nombreBodega=data.nombreBodega;
    }
}
