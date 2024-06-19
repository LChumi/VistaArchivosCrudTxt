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
import {Movimiento} from "../../../../core/models/Movimiento";
import {ProductoMov} from "../../../../core/models/ProductoMov";
import {Subscription} from "rxjs";
import {ImagenService} from "../../../../core/services/imagen.service";

@Component({
  selector: 'app-movimientos-pedidos',
  templateUrl: './movimientos-pedidos.component.html',
  styleUrl: './movimientos-pedidos.component.css'
})
export class MovimientosPedidosComponent implements OnInit{

  listaPedidos!:          Pedido[];
  listaProductosPedidos!: ProductoDespacho[];
  productosFiltrados:     ProductoMov[] =[]
  pedidoSelecionado!:     Pedido;
  listaMovimientos:       Movimiento[] = [];
  movimiento?:            Movimiento;
  movSeleccionado?:       Movimiento;
  productoSis?:           ProductoDespacho;
  productoSubscription!:  Subscription;

  pedidoInterno:    number = 0;
  barraItem:        string = '';
  imageUrl:         string = '';
  observacion:      string = '';
  searchItem:       string='';
  cantidad:         number = 0;
  cantProd:         number = 0;
  numProd:          number = 0;

  ventanaVista = false;

  usuariosessionStorage = sessionStorage.getItem('usuario') ?? '';

  constructor(
    private pedidoService: DespachoPedidosService,
    private productoDespachoService: DespachoProductosService,
    private movimientoService: MovimientosService,
    private imagenService: ImagenService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.usuariosessionStorage === '') {
      alert('Vuelva a iniciar sesión');
      this.logout();
    }
    this.listarMovimientos();
  }

  listarPedidos() {
    this.pedidoService.listarPedidos(this.pedidoInterno).subscribe(
      (pedidos: Pedido[]) => {
        this.listaPedidos = pedidos;
      }
    );
  }

  ListarProductosDespacho(pedido: Pedido) {
    this.ventanaVista = !this.ventanaVista;
    this.pedidoSelecionado= pedido
    this.productoDespachoService.listarProductos(pedido.codigoCco).subscribe(
      (productos: ProductoDespacho[]) => {
        this.listaProductosPedidos = productos;
        this.cargarProducDespConMovProduct();
      }
    );
  }

  listarMovimientos() {
    this.movimientoService.listarZhucay().subscribe(
      (movimientos: Movimiento[]) => {
        this.listaMovimientos = movimientos;
      }
    );
  }

  nuevoMovimiento(pedido: Pedido) {
    this.movimiento = new Movimiento();
    this.movimiento.detalle = pedido.comprobante;
    this.movimiento.usuario = this.usuariosessionStorage;
    this.limpiar();
    this.movimientoService.guardarZhucay(this.movimiento).subscribe(
      (mov: Movimiento) => {
        this.listarMovimientos();
        this.movSeleccionado = mov;
        this.ListarProductosDespacho(pedido);
      }
    );
  }

  buscarMovPed(pedido: Pedido) {
    if (this.listaMovimientos.length != 0) {
      for (const movimiento of this.listaMovimientos) {
        if (movimiento.detalle === pedido.comprobante) {
          this.movSeleccionado = movimiento;
          this.ListarProductosDespacho(pedido);
          return;
        }
      }
    }
    this.nuevoMovimiento(pedido);
  }

  cargarProducDespConMovProduct() {
    if (this.movSeleccionado?.productos) {
      const promises = this.listaProductosPedidos.map(pedido => {
        const productoMov = this.movSeleccionado?.productos.find(mov => mov.item === pedido.proId1);
        if (!productoMov) {
          return this.agregarProductoAsync(pedido);
        }
        return Promise.resolve(); // No need to do anything if productoMov exists
      });

      Promise.all(promises).then(() => {
        this.actualizarListaProductosMov();
      }).catch(error => {
        console.error('Error agregando products:', error);
      });
    }
  }

  actualizarListaProductosMov() {
    this.productosFiltrados = this.listaProductosPedidos.map(pedido => {
      const productoMov = this.movSeleccionado?.productos.find(mov => mov.item === pedido.proId1);
      return {
        id: productoMov ? productoMov.id : 0,
        barra: pedido.proId,
        detalle: pedido.proNombre,
        item: pedido.proId1,
        cantidadPedido: pedido.cantidad,
        observacionPedido: pedido.observacion || '',
        cantidadDigitada: productoMov ? productoMov.cantidadDigitada : 0,
        novedad: productoMov ? productoMov.novedad : ''
      };
    });
  }

  agregarProductoAsync(producto: ProductoDespacho): Promise<void> {
    return new Promise((resolve, reject) => {
      const nuevoProductoMov = new ProductoMov();
      nuevoProductoMov.barra = producto.proId;
      nuevoProductoMov.cantidadDigitada = this.cantidad;
      nuevoProductoMov.detalle = producto.proNombre;
      nuevoProductoMov.item = producto.proId1;
      nuevoProductoMov.cantidadPedido = producto.cantidad;
      nuevoProductoMov.observacionPedido = producto.observacion || '';
      nuevoProductoMov.novedad = this.observacion;

      this.buscarProductoCant(producto);

      if (producto.cantidad <= this.cantProd || producto.cantidad <= this.cantidad){
        alert("la cantidad es mayor a la cantidad Pedida ")
        return
      }

      if (this.movSeleccionado && this.movSeleccionado.id && this.movSeleccionado.detalle) {
        this.movimientoService.agregarProductoZhucay(this.movSeleccionado.id, this.movSeleccionado.detalle, nuevoProductoMov).subscribe(
          (mov: Movimiento) => {
            this.movSeleccionado = mov;
            this.productosFiltrados = mov.productos;
            this.numProd = mov.productos.length;
            this.buscarProductoCant(producto);
            this.cantidad = 0;
            this.observacion = '';
            resolve(); // Resolve the promise when the product is successfully added
          },
          error => {
            console.error('Error adding product:', error);
            reject(error); // Reject the promise if there's an error
          }
        );
      } else {
        alert('El movimiento seleccionado no tiene un ID o detalle definido.');
        reject(new Error('El movimiento seleccionado no tiene un ID o detalle definido.'));
      }
    });
  }

  mostrarProducto() {
    this.productoSis = new ProductoDespacho();
    if (!this.barraItem) {
      alert('Ingrese el item o la barra');
      return;
    }

    this.barraItem = this.barraItem.toUpperCase();
    const cco = this.pedidoSelecionado.codigoCco;
    this.productoSubscription = this.productoDespachoService.buscarProducto(cco, this.barraItem).subscribe({
      next: producto => {
        this.productoSis = producto;
        this.imagenService.getImagen(producto.proId + '.jpg').subscribe(
          data => {
            if (data) {
              this.imageUrl = URL.createObjectURL(data);
            } else {
              this.imageUrl = '';
              this.cantidad = 0;
            }
          },
          error => {
            this.imageUrl = '';
            this.cantidad = 0;
          }
        );
        this.agregarProductoAsync(producto);
        this.barraItem = '';
      },
      error: error => {
        alert('Producto no encontrado');
        this.barraItem = '';
        this.imageUrl = '';
        this.productoSis = new ProductoDespacho();
      }
    });
  }

  buscarProductoCant(productoSis: ProductoDespacho) {
    if (this.movSeleccionado?.productos) {
      for (let producto of this.movSeleccionado.productos) {
        if (producto.item === productoSis.proId1) {
          this.cantProd = producto.cantidadDigitada;
          break;
        }
      }
    }
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/Cumpleaños/inicio/login']);
  }

  limpiar() {
    this.productoSis = new ProductoDespacho();
    this.imageUrl = '';
    this.cantProd = 0;
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

  descargarExcel(){
    if (this.movSeleccionado){
      this.movimientoService.excelMovNarancay(this.movSeleccionado).subscribe(
        (excelBlob: Blob) => {
          const  url = window.URL.createObjectURL(excelBlob);

          const a = document.createElement('a');
          a.href = url;
          a.download=`${this.movSeleccionado?.detalle}.xlsx`
          document.body.appendChild(a)
          a.click();

          window.URL.revokeObjectURL(url);
          this.ventanaVista=!this.ventanaVista
        },
        error => {
          console.error(error)
        }
      )
    }

  }

  protected readonly faSearch = faSearch;
  protected readonly faFolderOpen = faFolderOpen;
  protected readonly faFileExcel = faFileExcel;
}
