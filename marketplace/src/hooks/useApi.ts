import { api } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useApi = () => {
  return useQuery({
    queryFn: async () => await api.get<{ message: string }>("/"),
    queryKey: ["server"],
  });
};
