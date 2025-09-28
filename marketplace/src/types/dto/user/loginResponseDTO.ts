import { RoleDTO } from "./roleDTO";

export interface LoginResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    role: RoleDTO;
  };
  accessToken: string;
}
