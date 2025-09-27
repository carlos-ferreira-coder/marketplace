import { api } from "@/services/axios";
import { CartResponseDTO } from "@/types/dto/cart/cartResponseDTO";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const fetcher = async (token: string): Promise<CartResponseDTO> => {
  const { data: response } = await api.get<CartResponseDTO>("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const useCart = () => {
  const { token } = useAuth();

  const { data, error, isError, isLoading } = useQuery<CartResponseDTO, Error>({
    queryFn: () => fetcher(token!),
    queryKey: ["cart"],
    enabled: !!token,
  });

  return { data, error, isError, isLoading };
};
