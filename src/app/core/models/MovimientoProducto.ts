import { Movimiento } from "./Movimiento";
import { ProductoMov } from "./ProductoMov";

export class AgregarProductoRequest {
    movimientosProductosDTO!: Movimiento;
    productoDTO!:             ProductoMov;
}
