export interface UsuarioEntity {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  contrasena: string;
  nombre_usuario: string;
}
type Usuario = Omit<UsuarioEntity, 'contrasena'>;
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
  autor: string;
  contador_likes: number;
}

type PostWithoutAutor = Omit<PostEntity, "autor">;
