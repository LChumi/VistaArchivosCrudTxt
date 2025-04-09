/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from '../confirmacion-dialog/confirmacion-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogRef: MatDialogRef<ConfirmacionDialogComponent> | undefined;

  constructor(private dialog: MatDialog, private router:Router) { }

  abrirConfirmacion(nombreBodega: string): void {
    // Cerrar el cuadro de diálogo anterior si existe
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    // Abrir el nuevo cuadro de diálogo
    this.dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      panelClass: 'confirm-dialog-container',
      data: { nombreBodega },
      disableClose: false // Habilita el cierre haciendo clic fuera del cuadro de diálogo
    });


     this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(/BOD. ZHUCAY/.test(nombreBodega)){
          this.router.navigate(['Cumpleaños/observaciones/zhucay']).then(r => {})
        }else if(/ALMACEN NARANCAY/.test(nombreBodega)){
          this.router.navigate(['Cumpleaños/observaciones/narancay']).then(r => {})
        }else if(/BOD. DAÑADOS/.test(nombreBodega)){
          this.router.navigate(['Cumpleaños/observaciones/bod_danados']).then(r => {})
        }else if(/EL VERGEL/.test(nombreBodega)){
          this.router.navigate(['Cumpleaños/observaciones/vergel']).then(r => {})
        }else if (/^(ALMACEN GRAN COLOMBIA P1)$/.test(nombreBodega)) {
          this.router.navigate(['Cumpleaños/observaciones/colombia']).then(r => {})
        }else if (/^(ALMACEN GRAN COLOMBIA P2)$/.test(nombreBodega)) {
          this.router.navigate(['Cumpleaños/observaciones/colombia2']).then(r => {})
        }else{
          alert('Proximamente')
        }
      }
    });

  }
}
