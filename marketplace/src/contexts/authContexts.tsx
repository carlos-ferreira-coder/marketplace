"use client";

import { loginService } from "@/services/auth";
import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import { RoleDTO } from "@/types/dto/user/roleDTO";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextsProps {
  name: string | null;
  role: RoleDTO | null;
  token: string | null;
  login: (request: LoginRequestDTO) => Promise<void>;
  logout: () => void;
}

export const AuthContexts = createContext<AuthContextsProps>({
  name: null,
  role: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

interface AuthContextsProviderProps {
  children: ReactNode;
}

export const AuthContextsProvider = ({
  children,
}: AuthContextsProviderProps) => {
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<RoleDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) setToken(accessToken);
  }, [setToken]);

  const login = async (request: LoginRequestDTO) => {
    const response = await loginService(request);

    if (!response) return;

    setName(response.user.name);
    setRole(response.user.role);
    setToken(response.accessToken);

    localStorage.setItem("name", response.user.name);
    localStorage.setItem("role", `${response.user.role}`);
    localStorage.setItem("token", response.accessToken);
  };

  const logout = () => {
    setName(null);
    setRole(null);
    setToken(null);

    localStorage.setItem("name", "");
    localStorage.setItem("role", "");
    localStorage.setItem("token", "");
  };

  return (
    <AuthContexts.Provider value={{ name, role, token, login, logout }}>
      {children}
    </AuthContexts.Provider>
  );
};
