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
import { useRouter } from "next/navigation";
import { fetcherProduct } from "./useProduct";
import axios from "axios";

const fetcherCart = async (token: string): Promise<CartResponseDTO> => {
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
    queryFn: () => fetcherCart(token!),
    queryKey: ["cart"],
    enabled: !!token && role === "USER",
    staleTime: 1000 * 60 * 30, // 30min
  });

  const cart = data || null;
  return { cart, error, isLoading };
};

export const useCartMutation = () => {
  const { token } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: cartAddProduct } = useMutation({
    mutationFn: (payload: CartAddProductRequestDTO) =>
      cartAddProductFn(token!, payload!),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSuccess: async (_response, request) => {
      const product = await fetcherProduct(request.productId);

      const params = new URLSearchParams({
        "success-msg": `"${product.name}" inserido(a) no carrinho!`,
      });

      router.push(`/cart?${params.toString()}`);
    },
    onError: async (error, request) => {
      const product = await fetcherProduct(request.productId);

      const params = new URLSearchParams({
        productId: request.productId,
      });

      if (axios.isAxiosError(error)) {
        params.append("warning-msg", "Não autorizado!");
        router.push(`/auth/login?${params.toString()}`);
      }

      params.append(
        "error-msg",
        `Erro ao adicionar "${product.name}" no carrinho!`
      );
      router.push(`/cart?${params.toString()}`);
    },
  });

  const { mutateAsync: cartDecreaseQuantity } = useMutation({
    mutationFn: (payload: CartDecreaseQuantityRequestDTO) =>
      cartDecreaseQuantityFn(token!, payload!),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSuccess: async (_response, request) => {
      const product = await fetcherProduct(request.productId);

      const params = new URLSearchParams({
        "success-msg": `"${product.name}" diminuido(a) do carrinho!`,
      });

      router.push(`/cart?${params.toString()}`);
    },
    onError: async (error, request) => {
      const product = await fetcherProduct(request.productId);

      const params = new URLSearchParams({
        productId: request.productId,
      });

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          params.append("error-msg", "Não autorizado!");
          router.push(`/auth/login?${params.toString()}`);
        } else {
          params.append(
            "error-msg",
            `"${product.name}" não encontrado(a) no carrinho!`
          );
        }
      } else {
        params.append(
          "error-msg",
          `Erro ao diminuir "${product.name}" do carrinho!`
        );
      }

      router.push(`/cart?${params.toString()}`);
    },
  });

  const { mutateAsync: cartRemoveProduct } = useMutation({
    mutationFn: (payload: CartRemoveProductRequestDTO) =>
      cartRemoveProductFn(token!, payload!),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSuccess: async (_response, request) => {
      const product = await fetcherProduct(request.productId);

      const params = new URLSearchParams({
        "success-msg": `"${product.name}" removido(a) no carrinho!`,
      });

      router.push(`/cart?${params.toString()}`);
    },
    onError: async (error, request) => {
      const product = await fetcherProduct(request.productId);

      const params = new URLSearchParams({
        productId: request.productId,
      });

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          params.append("error-msg", "Não autorizado!");
          router.push(`/auth/login?${params.toString()}`);
        } else {
          params.append(
            "error-msg",
            `"${product.name}" não encontrado(a) no carrinho!`
          );
        }
      } else {
        params.append(
          "error-msg",
          `Erro ao remover "${product.name}" do carrinho!`
        );
      }

      router.push(`/cart?${params.toString()}`);
    },
  });

  return { cartAddProduct, cartDecreaseQuantity, cartRemoveProduct };
};
