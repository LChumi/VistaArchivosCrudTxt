import {Component, inject} from '@angular/core';
import { BodegaConsignacion, RelacionConsignacion, RELACIONES_CONSIGNACION } from "../../../../mocks/bodegas";
import {ConsignacionService} from "../../../../core/services/consignacion.service";
import {faArrowUpFromBracket,} from "@fortawesome/free-solid-svg-icons";
import {ConsignacionRequest} from "../../../../core/models/consignacion-request";

@Component({
  selector: 'app-consignacion',
  templateUrl: './consignacion.component.html',
  styleUrls: ['./consignacion.component.css']
})
export class ConsignacionComponent {

  private consignacionService = inject(ConsignacionService);

  relaciones: RelacionConsignacion[] = RELACIONES_CONSIGNACION;

  consignacionSeleccionada?: RelacionConsignacion;
  bodegaDestino: BodegaConsignacion[] = [];
  cco!: string
  bodFin!: number
  codigoGenerado!: string
  generando: boolean = false;

  onChangeConsignacion() {
    if (!this.consignacionSeleccionada) {
      this.bodegaDestino = [];
      return;
    }

    this.bodegaDestino = this.consignacionSeleccionada.bodegasDestino;
  }
  generarConsignacion() {
    if (!this.consignacionSeleccionada || !this.bodFin || !this.cco) {
      alert("Escoga una bodega de consignacion");
      return;
    }

    this.generando = true;
    const request: ConsignacionRequest = {
      empresa: this.consignacionSeleccionada?.consignacion.empresa,
      bodIni: this.consignacionSeleccionada?.consignacion.codigo,
      bodFin: this.bodFin,
      comprobante: this.cco
    }

    this.consignacionService.generarConsignacion(request).subscribe({
      next: response => {
        if (this.isValidResponse(response)) {
          this.codigoGenerado = response;
        } else {
          alert("Respuesta vacía del servicio");
        }
        this.generando = false;
      },
      error: error => {
        alert(`Error al generar consignacion ${error}`);
        this.generando = false;
      }
    });
  }

  private isValidResponse(resp: string | null | undefined): boolean {
    return !!resp && resp.trim().length > 0;
  }

  protected readonly faArrowUpFromBracket = faArrowUpFromBracket;
}
