/*
 * Copyright (c) 2023-2024.
 *  Este código fue realizado por Luis Chumi y está protegido por las leyes de derechos de autor.
 *  Se concede el permiso para usar, copiar, modificar y distribuir este software con la condición de que se incluya este aviso en todas las copias o partes sustanciales del software.
 *  Para obtener ayuda, soporte o permisos adicionales, contacta a Luis Chumi en luischumi.9@gmail.com.
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
