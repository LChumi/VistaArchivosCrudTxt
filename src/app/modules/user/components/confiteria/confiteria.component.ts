import {Component, inject} from '@angular/core';
import {ProductoService} from "../../../../core/services/producto.service";
import {ConfiteriaRepor} from "../../../../core/models/confiteria-repor";
import {proveedor, PROVEEDORES_MOCK} from "../../../../mocks/proveedores";
import {faFileExcel, faMessage, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-confiteria',
  templateUrl: './confiteria.component.html',
  styleUrl: './confiteria.component.css'
})
export class ConfiteriaComponent {

  private productoService = inject(ProductoService)

  proveedores: proveedor[] = PROVEEDORES_MOCK
  proveedor!: string
  listaPorductos: ConfiteriaRepor[] = [];
  loadingProducto = false;
  buttonBlock = false;

  obtenerProductos(){
    if (!this.proveedor){
      alert("Ingrese un proveedor");
      return;
    }
    this.buttonBlock = true;
    this.loadingProducto = true;

    this.productoService.listaConfiteria(this.proveedor).subscribe({
      next: result => {
        if (result) {
          this.listaPorductos = result
          this.ordenarPorRotacionDesc()
          this.loadingProducto = false;
        } else {
          this.loadingProducto = false;
          this.buttonBlock = false;
        }
      }
    })
  }

  calcularRotacion(producto: any): number {
    const ventas = producto.cantVenta || 0;
    const stockIni = producto.stockIni || 0;
    const totalCompra = producto.ultCantCom || 0;

    const denominador = stockIni + totalCompra;
    if (denominador === 0) {
      return 0;
    }
    return ventas / denominador;
  }

  ordenarPorRotacionDesc() {
    this.listaPorductos.sort((a, b) => {
      const rotA = this.calcularRotacion(a);
      const rotB = this.calcularRotacion(b);
      return rotB - rotA; // mayor a menor
    });
  }

  protected readonly faFileExcel = faFileExcel;
  protected readonly faSearch = faSearch;
  protected readonly faMessage = faMessage;
}
