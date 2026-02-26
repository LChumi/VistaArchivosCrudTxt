import { Component } from '@angular/core';
import { BodegaConsignacion, RelacionConsignacion, RELACIONES_CONSIGNACION } from "../../../../mocks/bodegas";

@Component({
  selector: 'app-consignacion',
  templateUrl: './consignacion.component.html',
  styleUrls: ['./consignacion.component.css']
})
export class ConsignacionComponent {

  relaciones: RelacionConsignacion[] = RELACIONES_CONSIGNACION;

  consignacionSeleccionada?: RelacionConsignacion;
  bodegaDestino: BodegaConsignacion[] = [];
  cco!: string

  onChangeConsignacion(event: Event) {
    const select = event.target as HTMLSelectElement;
    const codigo = +select.value;

    const relacion = this.relaciones.find(r => r.consignacion.codigo === codigo);
    this.consignacionSeleccionada = relacion ?? undefined;
    this.bodegaDestino = relacion?.bodegasDestino ?? [];
  }
}
