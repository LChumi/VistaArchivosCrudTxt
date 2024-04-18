export interface DespachoPedido {
    id:             string;
    usuario:        string;
    nombre:         string;
    comprobante:    string;
    empresa:        number;
    codigoCco:      number;
    estado:         number;
    cliente:        string;
    pedido_interno: number;
}
