import { api } from "@/services/axios";
import { CartResponseDTO } from "@/types/dto/cart/cartResponseDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import { CartAddProductRequestDTO } from "@/types/dto/cart/cartAddProductRequestDTO";
import { CartAddProductResponseDTO } from "@/types/dto/cart/cartAddProductResponseDTO";
import { CartDecreaseQuantityRequestDTO } from "@/types/dto/cart/cartDecreaseQuantityRequestDTO";
import { CartRemoveProductRequestDTO } from "@/types/dto/cart/cartRemoveProductRequestDTO";
import { CartRemoveProductResponseDTO } from "@/types/dto/cart/cartRemoveProductResponseDTO";
import { CartDecreaseQuantityResponseDTO } from "@/types/dto/cart/cartDecreaseQuantityResponseDTO";
import axios from "axios";

const fetcher = async (token: string): Promise<CartResponseDTO | void> => {
  try {
    const { data: response } = await api.get<CartResponseDTO>("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const msg =
        error.response.status === 401
          ? "Não autorizado!"
          : "Carrinho não encontrado!";
      toast.error(msg);
      throw error;
    }

    console.log(error);
    toast.error("Erro ao buscar o carrinho!");
    throw error;
  }
};

const cartAddProductFn = async (
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error("Não autorizado!");
      throw error;
    }

    console.log(error);
    toast.error("Erro ao adicionar produto no carrinho!");
    throw error;
  }
};

const cartRemoveProductFn = async (
  token: string,
  cartRemoveProduct: CartRemoveProductRequestDTO
): Promise<CartRemoveProductResponseDTO | void> => {
  try {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const msg =
        error.response.status === 401
          ? "Não autorizado!"
          : "Produto não encontrado no carrinho!";
      toast.error(msg);
      throw error;
    }

    console.log(error);
    toast.error("Erro ao remover produto no carrinho!");
    throw error;
  }
};

const cartDecreaseQuantityFn = async (
  token: string,
  cartDecreaseQuantity: CartDecreaseQuantityRequestDTO
): Promise<CartDecreaseQuantityResponseDTO | void> => {
  try {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const msg =
        error.response.status === 401
          ? "Não autorizado!"
          : "Produto não encontrado no carrinho!";
      toast.error(msg);
      throw error;
    }

    console.log(error);
    toast.error("Erro ao diminuir a quantidade do produto no carrinho!");
    throw error;
  }
};

export const useCart = () => {
  const { token } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryFn: () => fetcher(token!),
    queryKey: ["cart"],
    enabled: !!token,
  });

  if (error) console.log(error);

  return { data, isLoading };
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
