"use client";

import {
  authLogin,
  authRegister,
  LoginRequestProps,
  RegisterRequestProps,
} from "@/services/auth";
import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import { RegisterRequestDTO } from "@/types/dto/user/registerRequestDTO";
import { RoleDTO, stringToRole } from "@/types/dto/user/roleDTO";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextsProps {
  name: string | null;
  role: RoleDTO | null;
  token: string | null;
  register: (request: RegisterRequestDTO) => Promise<RegisterRequestProps>;
  login: (request: LoginRequestDTO) => Promise<LoginRequestProps>;
  logout: () => void;
}

export const AuthContexts = createContext<AuthContextsProps>({
  name: null,
  role: null,
  token: null,
  register: async () => ({ success: false, error: "" }),
  login: async () => ({ success: false, error: "" }),
  logout: () => {},
});

interface AuthContextsProviderProps {
  children: ReactNode;
}

export const AuthContextsProvider = ({
  children,
}: AuthContextsProviderProps) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<RoleDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");

    setToken(storedToken);
    setName(storedName);

    setRole(
      storedRole && stringToRole[storedRole] ? stringToRole[storedRole] : null
    );
  }, []);

  const register = async (
    request: RegisterRequestDTO
  ): Promise<RegisterRequestProps> => {
    return await authRegister(request);
  };

  const login = async (
    request: LoginRequestDTO
  ): Promise<LoginRequestProps> => {
    const auth = await authLogin(request);

    if (!auth.success) return auth;

    const response = auth.data;

    setName(response.user.name);
    setRole(response.user.role);
    setToken(response.accessToken);

    localStorage.setItem("name", response.user.name);
    localStorage.setItem("role", `${response.user.role}`);
    localStorage.setItem("token", response.accessToken);

    return auth;
  };

  const logout = () => {
    setName(null);
    setRole(null);
    setToken(null);

    localStorage.setItem("name", "");
    localStorage.setItem("role", "");
    localStorage.setItem("token", "");

    queryClient.removeQueries({ queryKey: ["cart"] });
    queryClient.setQueryData(["cart"], null);

    const params = new URLSearchParams({
      "success-msg": "Deslogado com sucesso!",
    });

    router.push(`/?${params.toString()}`);
  };

  return (
    <AuthContexts.Provider
      value={{ name, role, token, register, login, logout }}
    >
      {children}
    </AuthContexts.Provider>
  );
};
