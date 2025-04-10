/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import {Component, OnInit} from '@angular/core';
import {Movimiento} from "../../../../core/models/Movimiento";
import {ProductoMov} from "../../../../core/models/ProductoMov";
import {MovimientosService} from "../../../../core/services/movimientos.service";
import {ImagenService} from "../../../../core/services/imagen.service";
import {faFileExcel, faFolderOpen, faFolderPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movimientos-zhucay',
  templateUrl: './movimientos-zhucay.component.html',
  styleUrl: './movimientos-zhucay.component.css'
})
export class MovimientosZhucayComponent implements OnInit {

  listaMovimientos:      Movimiento[] = []
  productosFiltrados:    ProductoMov[] =[]
  movimiento?:           Movimiento
  movSeleccionado?:      Movimiento

  detalle:          string='';
  barraItem:        string='';
  imageUrl:         string='';
  cantidad:         number=0;
  cantProd:         number=0;
  numProd:          number=0;
  searchItem:       string='';
  productoName:     string='';
  obs:              string='';
  nov:              string='';

  usuariosessionStorage = sessionStorage.getItem('usuario') ?? '';

  ventanaAddProd = false;


  constructor(private movimientoService: MovimientosService,
              private imagenService: ImagenService,
              private route: Router) { }

  ngOnInit(): void {
    if (this.usuariosessionStorage == '') {
      alert('Vuelva a iniciar sesión')
      this.logout()
    }
    this.listarMovimientos();
  }

  listarMovimientos(){
    this.movimientoService.listarZhucay().subscribe(
      (movimientos: Movimiento[]) =>{
        this.listaMovimientos=movimientos
      }
    )
  }

  buscarMovimiento(id:number,detalle:string){
    this.movimientoService.buscarZhucay(id,detalle).subscribe(
      (mov:Movimiento)=>{
        this.movSeleccionado=mov
        this.actualizarProductosFiltrados();
        this.limpiar();
        this.numProd=mov.productos.length;
        this.ventanaAddProd= !this.ventanaAddProd
      }
    )
  }

  nuevoMovimiento(){
    if(!this.detalle){
      alert('Por favort ingrese el detalle del movimiento');
      return;
    }

    this.movimiento = new Movimiento()
    this.limpiar();
    this.movimiento.detalle= this.detalle.toUpperCase();
    this.movimiento.usuario= this.usuariosessionStorage;

    this.movimientoService.guardarZhucay(this.movimiento).subscribe({
      next:(mov: Movimiento) => {
        this.listarMovimientos();
        this.detalle='';
        this.movSeleccionado=mov
        this.ventanaAddProd = !this.ventanaAddProd

      },
      error:(error:any)=> {
        this.detalle= '';
      }
    })
  }

  mostrarProducto(prod:ProductoMov) {
          this.imagenService.getImagen(prod.barra + '.jpg').subscribe(
            data => {
              if (data) {
                this.imageUrl = URL.createObjectURL(data);
                this.obs=prod.observacionPedido
                this.nov=prod.novedad
                this.productoName=prod.detalle
              } else {
                this.imageUrl = '';
                this.cantidad=0;
                this.productoName=''
              }
            },
            error => {
              this.imageUrl = '';
              this.cantidad=0;
              this.productoName=''
            }
          )
  }

  descargarExcel(){
    if (this.movSeleccionado){
      this.movimientoService.excelMovZhucay(this.movSeleccionado).subscribe(
        (excelBlob: Blob) => {
          const  url = window.URL.createObjectURL(excelBlob);

          const a = document.createElement('a');
          a.href = url;
          a.download=`${this.movSeleccionado?.detalle}.xlsx`
          document.body.appendChild(a)
          a.click();

          window.URL.revokeObjectURL(url);
          this.ventanaAddProd=!this.ventanaAddProd
        },
        error => {
          console.error(error)
        }
      )
    }
  }

  limpiar(){
    this.imageUrl=''
    this.cantProd=0;
  }

  filtrarProductos(){
    this.actualizarProductosFiltrados()
  }

  actualizarProductosFiltrados(){
    if (this.movSeleccionado) {
      this.productosFiltrados = this.movSeleccionado.productos.filter((prod) =>
        prod.item.toLowerCase().includes(this.searchItem.toLowerCase())
      );
    } else {
      this.productosFiltrados = [];
    }
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/Cumpleaños/inicio/login'])
  }

  protected readonly faFolderOpen = faFolderOpen;
  protected readonly faFolderPlus = faFolderPlus;
  protected readonly faFileExcel = faFileExcel;
  protected readonly faSearch = faSearch;
}
