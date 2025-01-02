import { PostEntity } from "../types/types";

export const validatePostData = (data: PostEntity) => {
  const errors: Record<string, string> = {};

  if (!data.fecha_creacion || isNaN(new Date(data.fecha_creacion).getTime())) {
    errors.fecha_creacion = "Ingrese una fecha de creación.";
  }
  if (
    !data.fecha_publicacion ||
    isNaN(new Date(data.fecha_publicacion).getTime())
  ) {
    errors.fecha_publicacion = "Ingrese una fecha de publiación.";
  }

  if (!data.descripcion || data.descripcion.trim() === "") {
    errors.descripcion = "La descripción no puede estar vacía.";
  }

  if (!data.titulo || data.titulo.trim() === "") {
    errors.titulo = "Ingrese un titulo";
  }

  return errors;
};
