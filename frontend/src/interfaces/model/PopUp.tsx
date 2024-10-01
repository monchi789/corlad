export interface PopUp {
  id: number;
  imagen: string;
  estado_popup: boolean;
}

export const defaultPopUp: PopUp = {
  id: 0,
  imagen: "",
  estado_popup: false
}