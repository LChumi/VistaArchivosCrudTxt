/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import {Component, inject, OnInit} from '@angular/core';
import { Bodega } from '../../../../core/models/Bodega';
import { BodegaService } from './services/bodega.service';
import { DialogService } from '../../../../components/notification/services/dialog.service';
import { Router } from '@angular/router';
import {faFileExcel, faFileExport, faFilePdf, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {ReportsService} from "../../../../core/services/reports.service";
import {finalize} from "rxjs";
import {ModelsService} from "../../../../core/services/models.service";

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.css'
})
export class BodegasComponent implements OnInit {

  bodegaSeleccionada!: Bodega;
  listaBodegas!: Bodega[];
  id_usuario = sessionStorage.getItem('idUsuario') ?? '';
  id_empresa = sessionStorage.getItem('idEmpresa') ?? '';
  alamcenNarancayImg:string = '../../../../../assets/img/bodega.jpg';
  movimientosImg:string = '../../../../../assets/img/movimientos.jpg';
  showModal=false
  modalConta = false
  isConta = false;
  donwloading=false
  isSending=false

  codigo:string ='0';
  data:string=''
  emailEmpresarial = '';
  maxFileSize =1048576; //1MB

  message: string | null = null;
  selectedFile: File | null = null;

  modelService = inject(ModelsService);


  constructor(private bodegaService: BodegaService, private dialogService:DialogService,private router: Router, private reportService:ReportsService) { }

  ngOnInit(): void {
    if (this.id_usuario == '' || this.id_empresa == '') {
      alert('Vuelva a iniciar sesión')
      this.logout()
    }
    this.listarBodegas()
    this.obtenerCorreoEmpresarial()

  }

  listarBodegas() {
    this.bodegaService.getBodegas(this.id_usuario, this.id_empresa).subscribe(
      (listarBodegas:Bodega[]) => this.listaBodegas=listarBodegas
    )
  }

  obtenerCorreoEmpresarial(){
    this.modelService.getEmpleado(this.id_usuario).subscribe(
      empleado => {
        if (empleado.mailEmpresa){
          this.emailEmpresarial=empleado.mailEmpresa
          this.modalConta = true
          this.isConta = true
        }
    }
    )
  }

  BodegaSelecccionada(bodega: Bodega) {
    this.bodegaSeleccionada = bodega;
    sessionStorage.setItem('bodId', String(this.bodegaSeleccionada.bod_codigo));
    this.dialogService.abrirConfirmacion(bodega.bod_nombre);
  }

  ingresarMovimientos(nombreBodega: string) {
    switch (true) {
      case this.listaBodegas.some(bod => /SUGERIDOS/.test(nombreBodega)):
        this.router.navigate(['Cumpleaños/observaciones/sugeridos']);
        break;
      case this.listaBodegas.some(bod => /BOD. ZHUCAY/.test(nombreBodega) && /BOD. ZHUCAY/.test(bod.bod_nombre)):
        this.router.navigate(['Cumpleaños/observaciones/mov_pedidos']);
        break;
      case this.listaBodegas.some(bod => /PED. ZHUCAY/.test(nombreBodega)):
        this.router.navigate(['Cumpleaños/observaciones/mov_zhucay']);
        break;
      // Agrega más casos según sea necesario para otras bodegas
      default:
        alert('No tienes acceso a esta funcion')
        // Haz algo en caso de que el nombre de la bodega no coincida con ningún caso
        break;
    }
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSize){
        alert('El archivo no debe exceder 1MB')
        return;
      }

      //Verificar tipo de archivo
      const validExtensions = ['.xml', '.txt', 'csv', '.json'];
      const fileExtensions = file.name.split('.').pop().toLowerCase();
      if (!validExtensions.includes('.' + fileExtensions)){
        alert('Archivo no permitido')
        return;
      }

      this.selectedFile = file;
    }
  }

  sendString(data: string) {
    this.isSending= true
    this.modelService.sendString(data, this.emailEmpresarial).subscribe(
      success => {
        this.message = success ? 'Datos subidos satisfactoriamente' : 'Ocurrió un error';
        this.cleaninputs()
        this.isSending = false
      },
      error => {
        console.error('Error al enviar el texto ', error)
        this.message = 'Error al enviar los datos';
        this.cleaninputs()
        this.isSending=false
      }
    );
  }

  sendFile() {
    this.isSending= true
    if (this.selectedFile && this.emailEmpresarial) {
      this.modelService.sendFile(this.selectedFile, this.emailEmpresarial).subscribe(
        success => {
          this.message = success ? 'Datos subidos satisfactoriamente' : 'Ocurrió un error';
          this.cleaninputs()
          this.isSending=false
        },
        error => {
          console.error('Error enviando el archivo:', error);
          this.message = 'Error al enviar el archivo';
          this.cleaninputs()
          this.isSending=false
        }
      );
    }
  }

  cleaninputs(){
    this.selectedFile = null;
    this.data = '';
  }

  protected readonly faFileExport = faFileExport;
  protected readonly faWindowClose = faWindowClose;
  protected readonly faFileExcel = faFileExcel;
  protected readonly faFilePdf = faFilePdf;
}
