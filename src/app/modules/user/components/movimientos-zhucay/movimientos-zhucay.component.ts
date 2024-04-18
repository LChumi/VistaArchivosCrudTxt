/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Movimiento} from "../../../../core/models/Movimiento";
import {Producto} from "../../../../core/models/Producto";
import {ProductoMov} from "../../../../core/models/ProductoMov";
import {MovimientosService} from "../../../../core/services/movimientos.service";
import {ImagenService} from "../../../../core/services/imagen.service";
import {ProductoService} from "../../../../core/services/producto.service";
import {faFileExcel, faFolderOpen, faFolderPlus, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-movimientos-zhucay',
  templateUrl: './movimientos-zhucay.component.html',
  styleUrl: './movimientos-zhucay.component.css'
})
export class MovimientosZhucayComponent implements OnInit {

  productoSubscription!: Subscription;
  listaMovimientos:      Movimiento[] = []
  productosFiltrados:    ProductoMov[] =[]
  movimiento?:           Movimiento
  movSeleccionado?:      Movimiento
  producto?:             Producto
  productoMov?:          ProductoMov

  detalle:          string='';
  barraItem:        string='';
  imageUrl:         string='';
  cantidad:         number=0;
  cantProd:         number=0;
  numProd:          number=0;
  searchItem:       string='';

  usuariosessionStorage = sessionStorage.getItem('usuario') ?? '';

  ventanaAddProd = false;


  constructor(private movimientoService: MovimientosService, private imagenService: ImagenService, private productoService: ProductoService) { }

  ngOnInit(): void {
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

  agregarProducto(producto: Producto){
    this.productoMov= new ProductoMov()
    this.productoMov.barra= producto.pro_id;
    this.productoMov.cantidad=this.cantidad;
    this.productoMov.detalle = producto.pro_nombre;
    this.productoMov.item =producto.pro_id1;

    if (this.movSeleccionado && this.movSeleccionado.id && this.movSeleccionado.detalle) {
      this.movimientoService.agregarProductoZhucay(this.movSeleccionado.id, this.movSeleccionado.detalle, this.productoMov).subscribe(
        (mov: Movimiento)=>{
          this.movSeleccionado=mov
          this.actualizarProductosFiltrados()
          this.buscarProductoCant(producto);
          this.numProd=mov.productos.length;
          this.cantidad=0;
        }
      );
    } else {
      alert('El movimiento seleccionado no tiene un ID o detalle definido.');
    }
  }

  mostrarProducto() {
    this.producto = new Producto()
    if (!this.barraItem) {
      alert('Ingrese el item o la barra');
      return;
    }

    this.barraItem = this.barraItem.toUpperCase();
    this.productoSubscription = this.productoService.buscarProducto(this.barraItem)
      .subscribe({
        next: (producto: Producto) => {
          this.producto = producto;
          this.imagenService.getImagen(this.producto.pro_id + '.jpg').subscribe(
            data => {
              if (data) {
                const objectUrl = URL.createObjectURL(data);
                this.imageUrl = objectUrl;
              } else {
                this.imageUrl = '';
                this.cantidad=0;
              }
            },
            error => {
              this.imageUrl = '';
              this.cantidad=0;
            }
          )
          this.agregarProducto(producto);
          this.barraItem = '';
        },
        error: error => {
          alert('Producto no encontrado');
          console.error(error);
          this.barraItem = '';
          this.producto = new Producto();
        }
      });
  }

  buscarProductoCant(productoSis:Producto){
    if (this.movSeleccionado?.productos) {
      for (let producto of this.movSeleccionado.productos) {
        if(producto.item === productoSis.pro_id1){
          this.cantProd=producto.cantidad
          break;
        }
      }
    }
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
    this.producto=new Producto()
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

  protected readonly faFolderOpen = faFolderOpen;
  protected readonly faFolderPlus = faFolderPlus;
  protected readonly faFileExcel = faFileExcel;
  protected readonly faSearch = faSearch;
}
