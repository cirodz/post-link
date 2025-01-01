import { LoginData, Usuario, UsuarioEntity } from "../types/types";

const API_URL = "http://localhost:5173";

interface LoginRepository {
  login: (credentials: LoginData) => Promise<Usuario | null>;
  logout: () => Promise<void>;
}

class LoginRepositoryImpl implements LoginRepository {
  async login(credentials: LoginData): Promise<Usuario | null> {
    const res = await fetch(`${API_URL}/mock/usersData.json`);
    const users: UsuarioEntity[] = await res.json();
    const user: UsuarioEntity | undefined = users.find(
      (usuario) => usuario.correo === credentials.correo
    );

    if (!user) {
      return null;
    }
    if (user.contrasena !== credentials.contrasena) {
      return null;
    }

    return {
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      correo: user.correo,
      nombre_usuario: user.nombre_usuario,
    };
  }

  async logout(): Promise<void> {
    return;
  }
}

export default LoginRepositoryImpl;
