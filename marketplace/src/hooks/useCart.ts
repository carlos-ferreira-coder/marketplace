import { api } from "@/services/axios";
import { CartResponseDTO } from "@/types/dto/cart/cartResponseDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import { CartAddProductRequestDTO } from "@/types/dto/cart/CartAddProductRequestDTO";
import { CartAddProductResponseDTO } from "@/types/dto/cart/CartAddProductResponseDTO";

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

const cardAddProduct = async (
  token: string,
  cartAddProduct: CartAddProductRequestDTO
): Promise<CartAddProductResponseDTO | void> => {
  try {
    const { data: response } = await api.post<CartAddProductResponseDTO>(
      "/cart/add-product",
      cartAddProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Error add product to cart");
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

export const useCartMutation = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: cartAddProduct } = useMutation({
    mutationFn: (cartAddProduct: CartAddProductRequestDTO) =>
      cardAddProduct(token!, cartAddProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return { cartAddProduct };
};
