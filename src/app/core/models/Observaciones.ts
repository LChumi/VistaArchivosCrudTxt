/*
 * Copyright (c) 2023. Luis Chumi
 * Este programa es software libre: usted puede redistribuirlo y/o modificarlo bajo los términos de la Licencia Pública General GNU
 */

import {Correccion} from "./Correccion";

export class Observacion{
  fecha!:string;
  item!:string;
  descripcion!:string;
  bulto!:string;
  unidad!:string;
  cxb!:number;
  stock!:number;
  precio!:number;
  precioTotal!:number;
  usuario!:string;
  detalle!:string;
  diferencia!:string;
  correccion!:Correccion;

  get precioConIVA():number{
    const porcentajeIva = 1.12;
    return this.precio*porcentajeIva;
  }
}
