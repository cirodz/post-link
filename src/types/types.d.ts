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
