export interface EstadoCuenta {
  id_estado_de_cuenta: number,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  numero_colegiatura: string,
  monto_acumulado: number
}

export const defaultEstadoCuenta = {
  id_estado_de_cuenta: 0,
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  numero_colegiatura: "0",
  monto_acumulado: 0
}