import { Categoria, defaultCategoria } from "./Categoria";

export interface Publicacion {
  id: number;
  titulo: string;
  contenido: string;
  fecha_publicacion: string;
  imagen_publicacion: string;
  documento?: string;
  id_categoria: Categoria
}

export const defaultPublicacion = {
  id: 0,
  titulo: "",
  contenido: "",
  fecha_publicacion: "",
  imagen_publicacion: "",
  documento: "",
  id_categoria: defaultCategoria
}
