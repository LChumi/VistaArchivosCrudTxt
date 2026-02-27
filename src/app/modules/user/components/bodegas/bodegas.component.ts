/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import {Component, OnInit} from '@angular/core';
import { Bodega } from '../../../../core/models/Bodega';
import { BodegaService } from './services/bodega.service';
import { DialogService } from '../../../../components/notification/services/dialog.service';
import { Router } from '@angular/router';
import {faFileExcel, faFileExport, faFilePdf, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {ReportsService} from "../../../../core/services/reports.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.css'
})
export class BodegasComponent implements OnInit {

  bodegaSeleccionada!: Bodega;
  listaBodegas!: Bodega[];
  id_usuario = sessionStorage.getItem('idUsuario') ?? '';
  username = sessionStorage.getItem('usuario') ?? '';
  id_empresa = sessionStorage.getItem('idEmpresa') ?? '';
  alamcenNarancayImg:string = '../../../../../assets/img/bodega.jpg';
  showModal=false
  donwloading=false
  codigo:string ='0';
  data:string=''



  constructor(private bodegaService: BodegaService, private dialogService:DialogService,private router: Router, private reportService:ReportsService) { }

  ngOnInit(): void {
    if (this.id_usuario == '' || this.id_empresa == '') {
      alert('Vuelva a iniciar sesión')
      this.logout()
    }
    this.listarBodegas()
  }

  listarBodegas() {
    this.bodegaService.getBodegas(this.id_usuario, this.id_empresa).subscribe(
      (listarBodegas:Bodega[]) => this.listaBodegas=listarBodegas
    )
  }


  BodegaSelecccionada(bodega: Bodega) {
    this.bodegaSeleccionada = bodega;
    sessionStorage.setItem('bodId', String(this.bodegaSeleccionada.bod_codigo));
    this.dialogService.abrirConfirmacion(bodega.bod_nombre);
  }

  abrirConsignacion(){
    if (this.username == 'CABRERA EDISON' || this.username == 'NAULA XAVIER'){
      this.dialogService.abrirConfirmacion('CONSIGNACION')
    }
  }

  abrirConfiteria(){
    this.dialogService.abrirConfirmacion('CONFITERIA')
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/Cumpleaños/inicio/login'])
  }

  descargarExcel(): void {
    if (this.codigo) {
      this.donwloading = true; // Establece el estado de carga a verdadero
      this.reportService.getExcelReport(this.codigo).pipe(
        finalize(() => this.donwloading = false) // Restablece el estado de carga después de la descarga
      ).subscribe({
        next: () => {
          // Aquí puedes manejar el éxito de la descarga si es necesario
        },
        error: (err) => {
          console.error('Error descargando Excel', err);
          // Aquí puedes manejar el error si es necesario
          this.donwloading = false;
        }
      });
    } else {
      alert('Por favor, ingrese un número de pedido.');
    }
  }

  descargarPdf(): void {
    if (this.codigo) {
      this.donwloading = true; // Establece el estado de carga a verdadero
      this.reportService.getPdfReport(this.codigo).pipe(
        finalize(() => this.donwloading = false) // Restablece el estado de carga después de la descarga
      ).subscribe({
        next: () => {
          // Aquí puedes manejar el éxito de la descarga si es necesario
        },
        error: (err) => {
          console.error('Error descargando PDF', err);
          // Aquí puedes manejar el error si es necesario
          this.donwloading = false;
        }
      });
    } else {
      alert('Por favor, ingrese un número de pedido.');
    }
  }

  protected readonly faFileExport = faFileExport;
  protected readonly faWindowClose = faWindowClose;
  protected readonly faFileExcel = faFileExcel;
  protected readonly faFilePdf = faFilePdf;
}
