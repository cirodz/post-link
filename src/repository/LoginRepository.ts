import { LoginData, Usuario } from "../types/types";

const API_URL = "http://localhost:5173";

interface LoginRepository {
  login: (credentials: LoginData) => Promise<Usuario | null>;
  logout: () => Promise<void>;
}

class LoginRepositoryImpl implements LoginRepository {
  async login(credentials: LoginData): Promise<Usuario | null> {
    const res = await fetch(`${API_URL}/mock/usersData.json`);
    const users: Usuario[] = await res.json();
    const user: Usuario | undefined = users.find(
      (usuario) => usuario.correo === credentials.correo
    );

    if (!user) {
      return null;
    }
    if (user.contrasena !== credentials.contrasena) {
      return null;
    }
    return user;
  }

  async logout(): Promise<void> {
    return;
  }
}

export default LoginRepositoryImpl;
