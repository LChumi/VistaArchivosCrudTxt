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
          this.router.navigate(['Cumpleaños/observaciones/zhucay'])
        }else if(/ALMACEN NARANCAY/.test(nombreBodega)){
          this.router.navigate(['Cumpleaños/observaciones/narancay'])
        }else if(/BOD. DAÑADOS/.test(nombreBodega)){
          this.router.navigate(['Cumpleaños/observaciones/bod_danados'])
        }else{
          alert('Proximamente')
        }
      }
    });

  }
}
