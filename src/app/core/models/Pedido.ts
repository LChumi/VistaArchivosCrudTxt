/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

export class Pedido {
  id!:             string;
  usuario!:        string;
  nombre!:         string;
  comprobante!:    string;
  empresa!:        number;
  codigoCco!:      number;
  estado!:         number;
  cliente!:        string;
  pedido_interno!: number;
}
