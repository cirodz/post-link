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
