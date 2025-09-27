import { LoginRequestDTO } from "@/types/dto/login/LoginRequestDTO";
import { api } from "./axios";
import { LoginResponseDTO } from "@/types/dto/login/loginResponseDTO";
import { toast } from "react-toastify";

export const Login = async (request: LoginRequestDTO) => {
  try {
    const { data: response } = await api.post<LoginResponseDTO>(
      "/auth/login",
      request
    );
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Error fetching login");
  }
};
