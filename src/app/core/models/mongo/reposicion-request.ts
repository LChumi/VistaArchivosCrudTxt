import {ConfiteriaRepor} from "../confiteria-repor";
import {ReposicionConfiteria} from "./reposicion-confiteria";

export interface ReposicionRequest {
  repo: ReposicionConfiteria,
  detalles: ConfiteriaRepor[]
}
