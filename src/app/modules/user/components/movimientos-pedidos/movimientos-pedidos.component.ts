/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import {Component, OnInit} from '@angular/core';
import {Pedido} from "../../../../core/models/Pedido";
import {ProductoDespacho} from "../../../../core/models/ProductoDespacho";
import {DespachoPedidosService} from "../../../../core/services/despacho-pedidos.service";
import {DespachoProductosService} from "../../../../core/services/despacho-productos.service";
import {faFileExcel, faFolderOpen, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {MovimientosService} from "../../../../core/services/movimientos.service";
import {ProductoService} from "../../../../core/services/producto.service";
import {Movimiento} from "../../../../core/models/Movimiento";
import {Producto} from "../../../../core/models/Producto";
import {ProductoMov} from "../../../../core/models/ProductoMov";
import {Subscription} from "rxjs";
import {ImagenService} from "../../../../core/services/imagen.service";

@Component({
  selector: 'app-movimientos-pedidos',
  templateUrl: './movimientos-pedidos.component.html',
  styleUrl: './movimientos-pedidos.component.css'
})
export class MovimientosPedidosComponent implements OnInit{

  listaPedidos!:                Pedido[];
  listaProductosPedidos!:       ProductoDespacho[];
  pedidoSelecionado!:           Pedido
  productoDespachoSelecionado!: ProductoDespacho;
  listaMovimientosPedidos:      Movimiento[] = []
  listaMovimientos:             Movimiento[] = []
  movimiento?:                  Movimiento
  movSeleccionado?:             Movimiento
  productoSis?:                 Producto
  productoMov?:                 ProductoMov
  productoSubscription!:        Subscription;


  pedidoInterno:  number =0;
  barraItem:      string='';
  imageUrl:       string='';
  cantidad:       number=0;
  cantProd:       number=0;
  numProd:        number=0;

  ventanaVista=false

  usuariosessionStorage = sessionStorage.getItem('usuario') ?? '';


  constructor(private pedidoService:DespachoPedidosService,
              private productoDespachoService:DespachoProductosService,
              private movimientoService: MovimientosService,
              private productoService: ProductoService,
              private imagenService: ImagenService,
              private route:Router) {
  }

  ngOnInit(): void {
    if (this.usuariosessionStorage == '') {
      alert('Vuelva a iniciar sesión')
      this.logout()
    }
    this.listarMovimientos();
  }

  listarPedidos(){
    this.pedidoService.listarPedidos(this.pedidoInterno).subscribe(
      (pedidos:Pedido[]) =>{
        this.listaPedidos=pedidos;
      }
    )
  }

  ListarProductosDespacho(pedido:Pedido){
    this.ventanaVista=!this.ventanaVista
    this.productoDespachoService.listarProductos(pedido.codigoCco).subscribe(
      (productos:ProductoDespacho[]) =>{
        this.listaProductosPedidos=productos;
      }
    )
  }
  listarMovimientos(){
    this.movimientoService.listarZhucay().subscribe(
      (movimientos: Movimiento[]) =>{
        this.listaMovimientos=movimientos
      }
    )
  }

  nuevoMovimiento(pedido:Pedido){
    this.movimiento= new Movimiento()
    this.movimiento.detalle= pedido.comprobante
    this.movimiento.usuario= this.usuariosessionStorage;
    this.limpiar()
    this.movimientoService.guardarZhucay(this.movimiento).subscribe(
      (mov:Movimiento) => {
        this.listarMovimientos();
        this.movSeleccionado= mov;
        this.ListarProductosDespacho(pedido);
      }
    )
  }

  buscarMovPed(pedido:Pedido){
      for (const movimiento of this.listaMovimientos){
        if (movimiento.detalle == pedido.comprobante){
          this.ListarProductosDespacho(pedido);
          this.cargarProducDespConMovProduct()
          break;
        }else {
          this.nuevoMovimiento(pedido)
        }
      }
  }

  cargarProducDespConMovProduct(){
    if (this.movSeleccionado?.productos){
      for (const prodDigitados of this.movSeleccionado.productos){
        for (const prodPedidos of this.listaProductosPedidos){
          if (prodDigitados.item == prodPedidos.proId1){
            prodPedidos.cantDigitada=prodDigitados.cantidad;
            prodPedidos.observacionDigitada=prodDigitados.observacion;
          }
        }
      }
    }
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
    this.productoSis = new Producto()
    if (!this.barraItem) {
      alert('Ingrese el item o la barra');
      return;
    }

    this.barraItem = this.barraItem.toUpperCase();
    this.productoSubscription = this.productoService.buscarProducto(this.barraItem)
      .subscribe({
        next: (producto: Producto) => {
          this.productoSis = producto;
          this.imagenService.getImagen(this.productoSis.pro_id + '.jpg').subscribe(
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
          this.productoSis = new Producto();
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

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/Cumpleaños/inicio/login'])
  }

  limpiar(){
    this.productoSis=new Producto()
    this.imageUrl=''
    this.cantProd=0;
  }

  protected readonly faSearch = faSearch;
  protected readonly faFolderOpen = faFolderOpen;
  protected readonly faFileExcel = faFileExcel;
}
