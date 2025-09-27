import { AuthContexts } from "@/contexts/authContexts";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContexts);
};
