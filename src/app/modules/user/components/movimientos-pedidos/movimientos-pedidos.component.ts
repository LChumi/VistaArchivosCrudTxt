import {Component, OnInit} from '@angular/core';
import {Pedido} from "../../../../core/models/Pedido";
import {ProductoDespacho} from "../../../../core/models/ProductoDespacho";
import {DespachoPedidosService} from "../../../../core/services/despacho-pedidos.service";
import {DespachoProductosService} from "../../../../core/services/despacho-productos.service";
import {faFolderOpen, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-movimientos-pedidos',
  templateUrl: './movimientos-pedidos.component.html',
  styleUrl: './movimientos-pedidos.component.css'
})
export class MovimientosPedidosComponent implements OnInit{

  listaPedidos!: Pedido[];
  listaProductosPedidos!: ProductoDespacho[];

  pedidoSelecionado!: Pedido
  productoDespachoSelecionado!: ProductoDespacho;

  pedidoInterno:number =0;
  ventanaVista=false

  constructor(private pedidoService:DespachoPedidosService, private productoDespachoService:DespachoProductosService) {
  }

  ngOnInit(): void {
  }

  listarPedidos(){
    this.pedidoService.listarPedidos(this.pedidoInterno).subscribe(
      (pedidos:Pedido[]) =>{
        this.listaPedidos=pedidos;
      }
    )
  }

  ListarProductosDespacho(pedido:Pedido){
    console.log('Llega cco',pedido)
    this.ventanaVista=!this.ventanaVista
    this.productoDespachoService.listarProductos(pedido.codigoCco).subscribe(
      (productos:ProductoDespacho[]) =>{
        this.listaProductosPedidos=productos;
      }
    )
  }


  protected readonly faSearch = faSearch;
  protected readonly faFolderOpen = faFolderOpen;
}
