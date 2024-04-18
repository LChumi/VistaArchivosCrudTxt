/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {
  faArrowRightFromBracket, faBarcode, faCircleExclamation,
  faFileCirclePlus, faFileExcel, faListCheck,
  faListUl,
  faMessage,
  faSearch, faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { Observacion } from "../../../../core/models/Observaciones";
import { Producto } from "../../../../core/models/Producto";
import { Correccion } from "../../../../core/models/Correccion";
import { ObservacionCorrecion } from "../../../../core/models/ObservacionCorreccion";
import { Router } from "@angular/router";
import { FiltroColorPipe } from "./pipes/filtro-color.pipe";
import { ProductoService } from '../../../../core/services/producto.service';
import { BarcodeFormat} from '@zxing/library'
import {Subscription} from "rxjs";
import {ImagenService} from "../../../../core/services/imagen.service";
import { ObservacionesService } from '../../../../core/services/observaciones.service';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrl: './observaciones.component.css'
})
export class ObservacionesComponent implements OnInit,OnDestroy  {
  constructor(private observacionService: ObservacionesService, private productoService: ProductoService, private route: Router,private imagen:ImagenService, private cdr: ChangeDetectorRef) { }

  filtroColorPipe: FiltroColorPipe = new FiltroColorPipe();

  formatosCodigoBarras:any[]= [BarcodeFormat['EAN_13']];
  productoSubscription!: Subscription;

  mostrarCamara = false;
  observaciones: Observacion[] = [];
  producto!: Producto;
  observacion!: Observacion;
  observacionSeleccionada!: Observacion;
  obCorr!: ObservacionCorrecion;
  detalleOb!: string;
  diferencia: string = '';
  novedad!: string;
  correccion!: Correccion;
  barraItem!: string;
  vistaAddObservacion = false;
  vistaCorreccion = false;
  colorSeleccionado!: string;
  totalObservaciones!: number;
  usuariosessionStorage = sessionStorage.getItem('usuario') ?? '';
  bodegasessionStorage = sessionStorage.getItem('bodId') ?? '';
  imageUrl?:string='';

  ngOnInit(): void {
    if (this.bodegasessionStorage == '' || this.usuariosessionStorage == '') {
      alert('Vuelva a iniciar sesión')
      this.logout()
    }
    console.log(this.usuariosessionStorage)
    this.listarObservaciones();
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.productoSubscription) {
      this.productoSubscription.unsubscribe();
    }
  }

  listarObservaciones(): void {
    this.observacionService.getObservacionesZhucay().subscribe(
      (lista: Observacion[]) => {
        this.observaciones = lista;
        this.totalObservaciones = this.observaciones.length;
        this.cdr.detectChanges();
      }
    )
  }

  seleccionarColor() {
    this.observacionService.getObservacionesZhucay().subscribe(
      (lista: Observacion[]) => {
        this.observaciones = this.filtroColorPipe.transform(lista, this.colorSeleccionado);
        this.totalObservaciones = this.observaciones.length;
      }
    )

  }

  mostrarProducto(): void {
    if (!this.barraItem) {
      alert('Ingrese el item o la barra');
      return;
    }
    this.barraItem = this.barraItem.toUpperCase();
    console.log(this.barraItem);
    // Realizar la suscripción y almacenar la referencia a la suscripción
    this.productoSubscription = this.productoService.getProducto(this.bodegasessionStorage, this.barraItem)
      .subscribe({
        next: (producto: Producto) => {
          this.producto = producto;
          this.imagen.getImagen(this.producto.pro_id+'.jpg').subscribe(
            data => {
              if (data){
                const objectUrl=URL.createObjectURL(data);
                this.imageUrl=objectUrl;
              }else{
                this.imageUrl='';
              }
            },
            error => {
              this.imageUrl='';
            }
          )
          this.barraItem = '';
        },
        error: error => {
          alert('Producto no encontrado');
          this.barraItem = '';
          this.producto = new Producto();
        }
      });
  }

  guardarObservacion() {
    if (!this.detalleOb) {
      alert('Por favor ingrese una observacion antes de guardar.');
      return;
    }
    if (this.producto.pro_nombre === undefined) {
      alert('Por favor Ingrese el producto ');
      return;
    }

    this.observacion = new Observacion()
    this.observacion.item = this.producto.pro_id1;
    this.observacion.descripcion = this.producto.pro_nombre;
    this.observacion.unidad = this.producto.unidad;
    this.observacion.bulto = this.producto.bulto;
    this.observacion.cxb = this.producto.cxb;
    this.observacion.stock = this.producto.stock_real;
    this.observacion.precio = this.producto.pvp;
    this.observacion.detalle = this.detalleOb.toUpperCase();
    this.observacion.diferencia = this.diferencia.toUpperCase();
    this.observacion.usuario = this.usuariosessionStorage;

    this.observacionService.guardarZhucay(this.observacion).subscribe({
      next: (obs: Observacion) => {
        this.listarObservaciones();
        this.detalleOb = '';
        this.diferencia='';
        this.cerrarVentana();
      },
      error: (error: any) => {
        this.detalleOb = '';
        this.diferencia ='';
        alert('Ingreso no válido');
      }
    });
  }

  agregarCorreccion() {
    if (!this.novedad) {
      alert('Por favor ingrese la novedad antes de guardar ')
    }
    this.obCorr = new ObservacionCorrecion();
    this.obCorr.observacion = this.observacionSeleccionada;
    this.correccion = new Correccion()
    this.correccion.detalle = this.novedad.toUpperCase();
    this.correccion.usuario = this.usuariosessionStorage;
    this.obCorr.correccion = this.correccion;

    this.observacionService.agregarCorreccionZhucay(this.obCorr).subscribe({
      next: (data: any) => {
        if (data) {
          this.listarObservaciones();
          this.novedad = '';
          this.cerrarVentanaCorreccion();
        }
      },
      error: (error: any) => {
        this.novedad = '';
        alert('Novedad no registrada');
      }
    });
  }

  descargarExcel(){
    this.observacionService.excelZhucay().subscribe(
      (excelBlob: Blob) => {
        const url= window.URL.createObjectURL(excelBlob);

        // Crear un enlace temporal para descargar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download='observaciones.xlsx';
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error(error)
      }
    )
  }

  selecionarObservacion(observacion: Observacion) {
    this.observacionSeleccionada = observacion
    console.log(this.observacionSeleccionada)
  }
  abrirVentana() {
    this.producto = new Producto();
    this.imageUrl = ''
    this.vistaAddObservacion = true;
  }
  cerrarVentana() {
    this.vistaAddObservacion = false;
  }
  abrirVentanaCorreccion() {
    this.vistaCorreccion = true;
  }
  cerrarVentanaCorreccion() {
    this.vistaCorreccion = false;
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/Cumpleaños/inicio/login'])
  }

  public tieneCorreccion(observacion: Observacion): string {
    const hoy = new Date();
    const fechaObservacion = this.convertirStringAFecha(observacion.fecha);

    // Si tiene corrección, devolver 'verde'
    if (observacion.correccion !== null) {
      return 'verde';
    }
    // Obtener el primer día del mes actual
    const primerDiaMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    // Si la fecha está en el último mes y hasta la fecha actual, devolver 'tomate'
    if (fechaObservacion >= primerDiaMesActual && fechaObservacion <= hoy) {
      return 'tomate';
    }
    // Si la fecha es anterior al último mes, devolver 'rojo'
    if (fechaObservacion < primerDiaMesActual) {
      return 'rojo';
    }
    // En cualquier otro caso, devolver ''
    return '';
  }

  private convertirStringAFecha(fechaString: string): Date {
    const [dia, mes, anio] = fechaString.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
  }

  abrirCamara(){
    this.mostrarCamara = !this.mostrarCamara;
  }

  codigoEscaneado(event:any){
    console.log(event)
    this.barraItem=event;
    this.mostrarProducto();
    this.mostrarCamara=false;
  }


  protected readonly faListUl = faListUl;
  protected readonly faMessage = faMessage;
  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  protected readonly faSearch = faSearch;
  protected readonly faFileCirclePlus = faFileCirclePlus;
  protected readonly faListCheck = faListCheck;
  protected readonly faTriangleExclamation = faTriangleExclamation;
  protected readonly faCircleExclamation = faCircleExclamation;
  protected readonly faBarcode = faBarcode;
  protected readonly faFileExcel = faFileExcel;
}
