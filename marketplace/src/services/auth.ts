import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import { api } from "./axios";
import { LoginResponseDTO } from "@/types/dto/user/loginResponseDTO";
import { toast } from "react-toastify";
import axios from "axios";
import { RegisterRequestDTO } from "@/types/dto/user/registerRequestDTO";
import { RegisterResponseDTO } from "@/types/dto/user/registerResponseDTO";

export const authLogin = async (request: LoginRequestDTO) => {
  try {
    const { data: response } = await api.post<LoginResponseDTO>(
      "/auth/login",
      request
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error("Email ou senha incorreto!");
    }

    toast.error("Erro ao realizar o login!");
  }
};

export const authRegister = async (request: RegisterRequestDTO) => {
  try {
    const { data: response } = await api.post<RegisterResponseDTO>(
      "/auth/register",
      request
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error("O usuário já existe!");
    }

    toast.error("Erro ao realizar o cadastro!");
  }
};
