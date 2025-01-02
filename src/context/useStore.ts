import { create } from "zustand";
import { LoginData, type Usuario } from "../types/types";
import { persist } from "zustand/middleware";
import LoginRepositoryImpl from "../repository/LoginRepository";

const LoginRepository = new LoginRepositoryImpl();

interface SessionState {
  user: Usuario | null;
  login: (session: LoginData) => Promise<boolean>;
  logout: () => void;
}
export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      login: async (session: LoginData): Promise<boolean> => {
        try {
          const user: Usuario | null = await LoginRepository.login(session);
          if (user == null) return false;
          set({ user });
          return true;
        } catch (error) {
          return false;
        }
      },
      logout: () => {
        LoginRepository.logout().then(() => {
          set({ user: null });
        });
      },
    }),
    { name: "user-session" }
  )
);
