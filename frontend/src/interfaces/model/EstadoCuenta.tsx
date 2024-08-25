import { Colegiado } from "./Colegiado";

export interface EstadoCuenta {
  id_estado_de_cuenta: number,
  saldo: number,
  fecha_actualizacion: string,
  id_colegiado: Colegiado
}