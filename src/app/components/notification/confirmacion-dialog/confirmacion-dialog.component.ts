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
