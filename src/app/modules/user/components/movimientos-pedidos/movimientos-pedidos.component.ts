import {Component, OnInit} from '@angular/core';
import {Pedido} from "../../../../core/models/Pedido";
import {ProductoDespacho} from "../../../../core/models/ProductoDespacho";
import {DespachoPedidosService} from "../../../../core/services/despacho-pedidos.service";
import {DespachoProductosService} from "../../../../core/services/despacho-productos.service";
import {Producto} from "../../../../core/models/Producto";
import {faFolderOpen, faSearch} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject} from "rxjs";

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
    this.ventanaVista=!this.ventanaVista
    const codigoCcoBigInt = new BehaviorSubject <string>(pedido.codigoCco.toString());
    this.productoDespachoService.listarProductos(codigoCcoBigInt.value).subscribe(
      (productos:ProductoDespacho[]) =>{
        this.listaProductosPedidos=productos;
      }
    )
  }


  protected readonly faSearch = faSearch;
  protected readonly faFolderOpen = faFolderOpen;
}
