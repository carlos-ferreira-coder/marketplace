export enum RoleDTO {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const stringToRole: Record<string, RoleDTO> = {
  ADMIN: RoleDTO.ADMIN,
  USER: RoleDTO.USER,
};
