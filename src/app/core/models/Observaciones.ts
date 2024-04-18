/*
 * Copyright (c) 2023-2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
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
