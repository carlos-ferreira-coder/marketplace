import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import { api } from "./axios";
import { LoginResponseDTO } from "@/types/dto/user/loginResponseDTO";
import { toast } from "react-toastify";
import axios from "axios";
import { RegisterRequestDTO } from "@/types/dto/user/registerRequestDTO";
import { RegisterResponseDTO } from "@/types/dto/user/registerResponseDTO";

type loginSuccess = { success: true; data: LoginResponseDTO };
type loginFailure = { success: false; error: string };
export type LoginRequestProps = loginSuccess | loginFailure;

export const authLogin = async (
  request: LoginRequestDTO
): Promise<LoginRequestProps> => {
  try {
    const { data: response } = await api.post<LoginResponseDTO>(
      "/auth/login",
      request
    );

    return { success: true, data: response };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: "Email ou senha incorreto!" };
    }

    return { success: false, error: "Erro ao realizar o login!" };
  }
};

type registerSuccess = { success: true; data: RegisterResponseDTO };
type registerFailure = { success: false; error: string };
export type RegisterRequestProps = registerSuccess | registerFailure;

export const authRegister = async (
  request: RegisterRequestDTO
): Promise<RegisterRequestProps> => {
  try {
    const { data: response } = await api.post<RegisterResponseDTO>(
      "/auth/register",
      request
    );

    return { success: true, data: response };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: "O usuário já existe!" };
    }

    return { success: false, error: "Erro ao realizar o cadastro!" };
  }
};
