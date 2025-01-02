export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  contrasena: string;
  nombre_usuario: string;
}

export interface LoginData {
  correo: string;
  contrasena: string;
}

export interface PostEntity {
  id?: string;
  titulo?: string;
  descripcion?: string;
  fecha_creacion?: Date | null;
  fecha_publicacion?: Date | null;
  foto?: string | null;
  autor?: number;
  contador_likes: number;
}

type PostWithoutAutor = Omit<PostEntity, "autor">;
