import { api } from "@/services/axios";
import { CartResponseDTO } from "@/types/dto/cart/cartResponseDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { CartAddProductRequestDTO } from "@/types/dto/cart/cartAddProductRequestDTO";
import { CartAddProductResponseDTO } from "@/types/dto/cart/cartAddProductResponseDTO";
import { CartDecreaseQuantityRequestDTO } from "@/types/dto/cart/cartDecreaseQuantityRequestDTO";
import { CartRemoveProductRequestDTO } from "@/types/dto/cart/cartRemoveProductRequestDTO";
import { CartRemoveProductResponseDTO } from "@/types/dto/cart/cartRemoveProductResponseDTO";
import { CartDecreaseQuantityResponseDTO } from "@/types/dto/cart/cartDecreaseQuantityResponseDTO";

const fetcher = async (token: string): Promise<CartResponseDTO> => {
  const { data: response } = await api.get<CartResponseDTO>("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const cartAddProductFn = async (
  token: string,
  cartAddProduct: CartAddProductRequestDTO
): Promise<CartAddProductResponseDTO> => {
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
};

const cartDecreaseQuantityFn = async (
  token: string,
  cartDecreaseQuantity: CartDecreaseQuantityRequestDTO
): Promise<CartDecreaseQuantityResponseDTO> => {
  const { data: response } = await api.patch<CartDecreaseQuantityResponseDTO>(
    "/cart/decrease-quantity",
    cartDecreaseQuantity,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

const cartRemoveProductFn = async (
  token: string,
  cartRemoveProduct: CartRemoveProductRequestDTO
): Promise<CartRemoveProductResponseDTO> => {
  const { data: response } = await api.delete<CartRemoveProductResponseDTO>(
    "/cart/remove-product",
    {
      data: cartRemoveProduct,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

export const useCart = () => {
  const { token, role } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryFn: () => fetcher(token!),
    queryKey: ["cart"],
    enabled: !!token && role === "USER",
    staleTime: 1000 * 60 * 30, // 30min
  });

  const cart = data || null;
  return { cart, error, isLoading };
};

export const useCartMutation = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: cartAddProduct } = useMutation({
    mutationFn: (cartAddProduct: CartAddProductRequestDTO) =>
      cartAddProductFn(token!, cartAddProduct!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const { mutate: cartRemoveProduct } = useMutation({
    mutationFn: (cartRemoveProduct: CartRemoveProductRequestDTO) =>
      cartRemoveProductFn(token!, cartRemoveProduct!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const { mutate: cartDecreaseQuantity } = useMutation({
    mutationFn: (cartDecreaseQuantity: CartDecreaseQuantityRequestDTO) =>
      cartDecreaseQuantityFn(token!, cartDecreaseQuantity!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return { cartAddProduct, cartRemoveProduct, cartDecreaseQuantity };
};
