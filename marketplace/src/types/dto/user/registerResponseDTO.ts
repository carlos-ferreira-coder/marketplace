export interface RegisterResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    cpf: string;
  };
  accessToken: string;
}
