/*
 * Copyright (c) 2023. Luis Chumi
 * Este programa es software libre: usted puede redistribuirlo y/o modificarlo bajo los términos de la Licencia Pública General GNU
 */

import { ProductoMov } from "./ProductoMov";

export class Movimiento {
    id!:        number;
    fecha!:     string;
    detalle!:    string;
    usuario!:   string;
    productos!: ProductoMov[];
}
