/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faArrowRightFromBracket, faBarcode, faCircleExclamation,
  faFileCirclePlus, faFileExcel, faListCheck,
  faListUl,
  faMessage,
  faSearch, faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { ProductoService } from '../../../../core/services/producto.service';
import { Router } from '@angular/router';
import { FiltroColorPipe } from './pipes/filtro-color.pipe';
import { Observacion } from '../../../../core/models/Observaciones';
import { Producto } from '../../../../core/models/Producto';
import { ObservacionCorrecion } from '../../../../core/models/ObservacionCorreccion';
import { Correccion } from '../../../../core/models/Correccion';
import { BarcodeFormat} from '@zxing/library'
import {ImagenService} from "../../../../core/services/imagen.service";
import { ObservacionesService } from '../../../../core/services/observaciones.service';


@Component({
  selector: 'app-observaciones-narancay',
  templateUrl: './observaciones-narancay.component.html',
  styleUrl: './observaciones-narancay.component.css'
})
export class ObservacionesNarancayComponent implements OnInit {

  constructor(private narancayService: ObservacionesService, private productoService: ProductoService, private router: Router, private cdr: ChangeDetectorRef, private imagen:ImagenService) { }

  filtroColorPipe: FiltroColorPipe = new FiltroColorPipe();

  formatosCodigoBarras:any[]= [BarcodeFormat['EAN_13']];

  mostrarCamara = false;
  observaciones: Observacion[] = [];
  producto!: Producto;
  observacion!: Observacion;
  observacionSeleccionada!: Observacion;
  obCorr!: ObservacionCorrecion;
  detalleOb!: string;
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

  listarObservaciones(): void {
    this.narancayService.getObservacionesNarancay().subscribe(
      (lista: Observacion[]) => {
        this.observaciones = lista;
        this.totalObservaciones = this.observaciones.length;
        this.cdr.detectChanges();
      }
    )
  }

  seleccionarColor() {
    this.narancayService.getObservacionesNarancay().subscribe(
      (lista: Observacion[]) => {
        this.observaciones = this.filtroColorPipe.transform(lista, this.colorSeleccionado);
        this.totalObservaciones = this.observaciones.length;
      }
    )
  }

  mostrarProducto() {
    if (!this.barraItem) {
      alert('Ingrese el item o la barra')
    }
    this.barraItem = this.barraItem.toUpperCase();
    this.productoService.getProducto(this.bodegasessionStorage, this.barraItem).subscribe(
      (producto: Producto) => {
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
      }, error => {
        alert('Producto no encontrado')
        this.barraItem = '';
        this.producto = new Producto();
      }
    );

  }

  guardarObservacion() {
    console.log(this.producto.pro_nombre)
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
    this.observacion.usuario = this.usuariosessionStorage;

    this.narancayService.guardarNarancay(this.observacion).subscribe(
      obs => {
        this.listarObservaciones();
        this.detalleOb = '';
        this.imageUrl = '';
        this.cerrarVentana();
      }, error => {
        this.detalleOb = '';
        alert('Ingreso no valido');
      }
    )
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

    this.narancayService.agregarCorreccionNarancay(this.obCorr).subscribe(
      data => {
        if (data) {
          this.listarObservaciones();
          this.novedad = '';
          this.cerrarVentanaCorreccion();
        }
      }, error => {
        this.novedad = '';
        alert('Novedad no registrada')
      }
    )
  }

  descargarExcel(){
    this.narancayService.excelNarancay().subscribe(
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
    this.router.navigate(['/Cumpleaños/inicio/login'])
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
