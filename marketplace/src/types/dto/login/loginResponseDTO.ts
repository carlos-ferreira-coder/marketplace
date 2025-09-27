import { RoleDTO } from "../user/roleDTO";

export interface LoginResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    role: RoleDTO;
    phone: string;
    cpf: string;
  };
  accessToken: string;
}
