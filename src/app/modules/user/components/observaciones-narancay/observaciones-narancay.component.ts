import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faArrowRightFromBracket, faCircleExclamation,
  faFileCirclePlus, faListCheck,
  faListUl,
  faMessage,
  faSearch, faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { ObservacionesNarancayService } from './services/observaciones-narancay.service';
import { ProductoService } from '../../../../core/services/producto.service';
import { Router } from '@angular/router';
import { FiltroColorPipe } from './pipes/filtro-color.pipe';
import { Observacion } from '../../../../core/models/Observaciones';
import { Producto } from '../../../../core/models/Producto';
import { ObservacionCorrecion } from '../../../../core/models/ObservacionCorreccion';
import { Correccion } from '../../../../core/models/Correccion';

@Component({
  selector: 'app-observaciones-narancay',
  templateUrl: './observaciones-narancay.component.html',
  styleUrl: './observaciones-narancay.component.css'
})
export class ObservacionesNarancayComponent implements OnInit {

  constructor(private narancayService: ObservacionesNarancayService, private productoService: ProductoService, private router: Router, private cdr: ChangeDetectorRef) { }

  filtroColorPipe: FiltroColorPipe = new FiltroColorPipe();

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

  listarObservaciones(): void {
    this.narancayService.getObservaciones().subscribe(
      (lista: Observacion[]) => {
        this.observaciones = lista;
        this.totalObservaciones = this.observaciones.length;
        this.cdr.detectChanges();
      }
    )
  }

  seleccionarColor() {
    this.narancayService.getObservaciones().subscribe(
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
    console.log(this.barraItem)
    this.productoService.getProducto(this.bodegaLocalStorage, this.barraItem).subscribe(
      (producto: Producto) => {
        this.producto = producto;
        this.barraItem = '';
      }, error => {
        alert('Producto no encontrado')
        this.barraItem = '';
        this.producto = new Producto();
      }
    )
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
    this.observacion.usuario = this.usuarioLocalStorage;

    this.narancayService.guardar(this.observacion).subscribe(
      obs => {
        this.listarObservaciones();
        this.detalleOb = '';
        this.cerrarVentana();
      }, error => {
        alert('Ingreso no valido');
      }
    )
  }

  agregarCorreccion() {
    if (!this.novedad) {
      alert('Por favor ingrese la novedad antes de guardar ')
    }
    const usuarioLocalStorage = localStorage.getItem('usuario') ?? 'ValorPredeterminado';
    this.obCorr = new ObservacionCorrecion();
    this.obCorr.observacion = this.observacionSeleccionada;
    this.correccion = new Correccion()
    this.correccion.detalle = this.novedad.toUpperCase();
    this.correccion.usuario = usuarioLocalStorage;
    this.obCorr.correccion = this.correccion;

    this.narancayService.agregarCorreccion(this.obCorr).subscribe(
      data => {
        if (data) {
          this.listarObservaciones();
          this.novedad = '';
          this.cerrarVentanaCorreccion();
        }
      }, error => {
        alert('Novedad no registrada')
      }
    )
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


  protected readonly faListUl = faListUl;
  protected readonly faMessage = faMessage;
  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  protected readonly faSearch = faSearch;
  protected readonly faFileCirclePlus = faFileCirclePlus;
  protected readonly faListCheck = faListCheck;
  protected readonly faTriangleExclamation = faTriangleExclamation;
  protected readonly faCircleExclamation = faCircleExclamation;

}
