import {Component, inject} from '@angular/core';
import {ProductoService} from "../../../../core/services/producto.service";
import {ConfiteriaRepor} from "../../../../core/models/confiteria-repor";
import {proveedor, PROVEEDORES_MOCK} from "../../../../mocks/proveedores";
import {faFileExcel, faPenToSquare, faSave, faSearch} from "@fortawesome/free-solid-svg-icons";
import {ConfiteriaService} from "../../../../core/services/mongo/confiteria.service";
import {ReposicionRequest} from "../../../../core/models/mongo/reposicion-request";
import {ReposicionConfiteria} from "../../../../core/models/mongo/reposicion-confiteria";

@Component({
  selector: 'app-confiteria',
  templateUrl: './confiteria.component.html',
  styleUrl: './confiteria.component.css'
})
export class ConfiteriaComponent {

  private productoService = inject(ProductoService)
  private confiteriaService = inject(ConfiteriaService)

  proveedores: proveedor[] = PROVEEDORES_MOCK
  proveedor!: string
  listaProductos: ConfiteriaRepor[] = [];
  productoSelect: ConfiteriaRepor | null = null;
  loadingProducto = false;
  saveAndGetExel = false;
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

    const proveedorCodificado = encodeURIComponent(this.proveedor);

    this.productoService.listaConfiteria(proveedorCodificado).subscribe({
      next: result => {
        if (result) {
          this.listaProductos = result
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
    this.cantidadPed = producto.pedido || 0;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }

  guardarCantidad() {
    if (this.productoSelect) {
      this.productoSelect.pedido = this.cantidadPed;
    }
    this.cerrarModal();
  }

  ordenarPorRotacionDesc() {
    this.listaProductos.sort((a, b) => {
      const rotA = this.calcularRotacion(a);
      const rotB = this.calcularRotacion(b);
      return rotB - rotA; // mayor a menor
    });
  }

  guardarProductos() {

    this.saveAndGetExel = true;

    const pedidosValidos = this.listaProductos.filter(
      producto =>
        producto.pedido !== null &&
        producto.pedido !== undefined &&
        producto.pedido > 0
    )

    if (pedidosValidos.length === 0) {
      alert("No hay pedidos, todos están en 0");
      return;
    }

    const proveedor = pedidosValidos[0].cliNombre
    const user = sessionStorage.getItem("usuario");

    if (user) {
      const repo: ReposicionConfiteria = {
        id: null,
        proveedor,
        estado: false,
        usuarioSolicitante: user,
        fecha: null
      }

      const request: ReposicionRequest = {
        repo,
        detalles: pedidosValidos
      }
      this.confiteriaService.guardarPedido(request).subscribe({
        next: result => {
          if (result) {
            const reposicionId = result[0].reposicionId;
            this.descargar(reposicionId)
            this.saveAndGetExel = false;
          }
        }
      })

    } else {
      alert('Por favor inicie sesion nuevamente')
    }
  }

  descargar(reposicionId: string) {
    this.confiteriaService.descargarExcel(reposicionId, this.proveedor).subscribe({
      error: (err) => console.error('Error al descargar:', err)
    });
  }

  protected readonly faFileExcel = faFileExcel;
  protected readonly faSearch = faSearch;
  protected readonly faPenToSquare = faPenToSquare;
  protected readonly faSave = faSave;
}
