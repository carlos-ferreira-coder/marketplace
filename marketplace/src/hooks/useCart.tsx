import { api } from "@/services/axios";
import { CartResponseDTO } from "@/types/dto/cart/cartResponseDTO";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

const fetcher = async (token: string): Promise<CartResponseDTO | void> => {
  try {
    const { data: response } = await api.get<CartResponseDTO>("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Error fetching cart");
  }
};

export const useCart = () => {
  const { token } = useAuth();

  const { data, isLoading } = useQuery({
    queryFn: () => fetcher(token!),
    queryKey: ["cart"],
    enabled: !!token,
  });

  return { data, isLoading };
};
