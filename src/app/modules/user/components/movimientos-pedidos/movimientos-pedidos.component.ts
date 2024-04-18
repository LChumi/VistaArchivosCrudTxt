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
