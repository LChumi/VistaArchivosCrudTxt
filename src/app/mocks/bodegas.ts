export interface BodegaConsignacion {
  nombre: string;
  codigo: number;
  empresa: number;
}

export interface RelacionConsignacion {
  consignacion: BodegaConsignacion;
  bodegasDestino: BodegaConsignacion[];
}

export const RELACIONES_CONSIGNACION: RelacionConsignacion[] = [
  {
    consignacion: {
      nombre: "CONSIGNACION NARANCAY",
      codigo: 10000646,
      empresa: 2,
    },
    bodegasDestino: [
      { nombre: "ALMACEN NARANCAY", codigo: 10000601, empresa: 2 }
    ]
  },
  {
    consignacion: {
      nombre: "CONSIGNACION GCO",
      codigo: 10000678,
      empresa: 3,
    },
    bodegasDestino: [
      { nombre: "GRAN COLOMBIA PISO 1", codigo: 10000699, empresa: 3 },
      { nombre: "GRAN COLOMBIA PISO 2", codigo: 10000567, empresa: 3 }
    ]
  },
  {
    consignacion: {
      nombre: "CONSIGNACION VERGEL",
      codigo: 10000679,
      empresa: 3,
    },
    bodegasDestino: [
      { nombre: "EL VERGEL", codigo: 10000568, empresa: 3 }
    ]
  }
];
