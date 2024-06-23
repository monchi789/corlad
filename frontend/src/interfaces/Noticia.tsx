export interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  fecha_publicacion: string;
  imagen_publicacion: string;
  documento: string;
  id_categoria: {
    id: number;
    nombre_categoria: string;
  };
}
