import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {
  faArrowRightFromBracket, faBarcode , faCircleExclamation,
  faFileCirclePlus, faListCheck,
  faListUl,
  faMessage,
  faSearch, faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { ObservacionesService } from "./services/observaciones.service";
import { Observacion } from "../../../../core/models/Observaciones";
import { Producto } from "../../../../core/models/Producto";
import { Correccion } from "../../../../core/models/Correccion";
import { ObservacionCorrecion } from "../../../../core/models/ObservacionCorreccion";
import { Router } from "@angular/router";
import { FiltroColorPipe } from "./pipes/filtro-color.pipe";
import { ProductoService } from '../../../../core/services/producto.service';
import { BarcodeFormat} from '@zxing/library'
import {Subscription} from "rxjs";

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrl: './observaciones.component.css'
})
export class ObservacionesComponent implements OnInit,OnDestroy  {
  constructor(private observacionService: ObservacionesService, private productoService: ProductoService, private route: Router, private cdr: ChangeDetectorRef) { }

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
  novedad!: string;
  correccion!: Correccion;
  barraItem!: string;
  vistaAddObservacion = false;
  vistaCorreccion = false;
  colorSeleccionado!: string;
  totalObservaciones!: number;
  usuarioLocalStorage = localStorage.getItem('usuario') ?? '';
  bodegaLocalStorage = localStorage.getItem('bodId') ?? '';

  ngOnInit(): void {
    if (this.bodegaLocalStorage == '' || this.usuarioLocalStorage == '') {
      alert('Vuelva a iniciar sesión')
      this.logout()
    }
    this.listarObservaciones();
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.productoSubscription) {
      this.productoSubscription.unsubscribe();
    }
  }

  listarObservaciones(): void {
    this.observacionService.getObservaciones().subscribe(
      (lista: Observacion[]) => {
        this.observaciones = lista;
        this.totalObservaciones = this.observaciones.length;
        this.cdr.detectChanges();
      }
    )
  }

  seleccionarColor() {
    this.observacionService.getObservaciones().subscribe(
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
    this.productoSubscription = this.productoService.getProducto(this.bodegaLocalStorage, this.barraItem)
      .subscribe({
        next: (producto: Producto) => {
          this.producto = producto;
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
    this.observacion.usuario = this.usuarioLocalStorage;

    this.observacionService.guardar(this.observacion).subscribe({
      next: (obs: Observacion) => {
        this.listarObservaciones();
        this.detalleOb = '';
        this.cerrarVentana();
      },
      error: (error: any) => {
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
    this.correccion.usuario = this.usuarioLocalStorage;
    this.obCorr.correccion = this.correccion;

    this.observacionService.agregarCorreccion(this.obCorr).subscribe({
      next: (data: any) => {
        if (data) {
          this.listarObservaciones();
          this.novedad = '';
          this.cerrarVentanaCorreccion();
        }
      },
      error: (error: any) => {
        alert('Novedad no registrada');
      }
    });
  }

  selecionarObservacion(observacion: Observacion) {
    this.observacionSeleccionada = observacion
    console.log(this.observacionSeleccionada)
  }
  abrirVentana() {
    this.producto = new Producto();
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
    localStorage.clear();
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

}
