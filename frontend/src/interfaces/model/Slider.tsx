export interface Slider {
  id: number,
  imagen_1: string,
  imagen_2: string,
  imagen_3: string,
  imagen_4: string,
  estado_slider: boolean
}

export const sliderDefault: Slider = {
  id: 0,
  imagen_1: "",
  imagen_2: "",
  imagen_3: "",
  imagen_4: "",
  estado_slider: false
}