import {Component, inject} from '@angular/core';
import {ProductoService} from "../../../../core/services/producto.service";
import {ConfiteriaRepor} from "../../../../core/models/confiteria-repor";
import {proveedor, PROVEEDORES_MOCK} from "../../../../mocks/proveedores";
import {faFileExcel, faMessage, faPenToSquare, faSearch} from "@fortawesome/free-solid-svg-icons";

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
  productoSelect: ConfiteriaRepor | null = null;
  loadingProducto = false;
  buttonBlock = false;
  showModal = false;
  cantidadPed!: number;

  obtenerProductos() {
    if (!this.proveedor) {
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

  agregarCantidad(producto: any) {
    this.productoSelect = producto;
    this.cantidadPed = producto.cantPedido || 0;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }

  guardarCantidad() {
    if (this.productoSelect) {
      this.productoSelect.cantPedido = this.cantidadPed;
    }
    this.cerrarModal();
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
  protected readonly faPenToSquare = faPenToSquare;
}
