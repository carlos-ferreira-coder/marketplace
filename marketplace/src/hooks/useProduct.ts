import { api } from "@/services/axios";
import { ProductResponseDTO } from "@/types/dto/product/productResponseDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { CreateProductResponseDTO } from "@/types/dto/product/createProductResponseDTO";
import { CreateProductRequestDTO } from "@/types/dto/product/createProductRequestDTO";
import { UpdateProductRequestDTO } from "@/types/dto/product/updateProductRequestDTO";
import { UpdateProductResponseDTO } from "@/types/dto/product/updateProductResponseDTO";
import { DeleteProductRequestDTO } from "@/types/dto/product/deleteProductRequestDTO";
import { DeleteProductResponseDTO } from "@/types/dto/product/deleteProductResponseDTO";
import { useRouter } from "next/navigation";
import axios from "axios";

export const fetcherProduct = async (
  id: string
): Promise<ProductResponseDTO> => {
  const { data: response } = await api.get<ProductResponseDTO>(
    `/products/${id}`
  );

  // TODO remover in production
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Executado depois de 5 segundos");

  return response;
};

const createProductFn = async (
  token: string,
  createProduct: CreateProductRequestDTO
): Promise<CreateProductResponseDTO> => {
  const formData = new FormData();

  if (!createProduct.image) {
    toast.error("Selecione uma imagem!");
    throw new Error("Imagem não informada");
  }

  formData.append("name", createProduct.name);
  formData.append("description", createProduct.description);
  formData.append("image", createProduct.image);
  formData.append("price", String(createProduct.price));

  const { data: response } = await api.post<CreateProductResponseDTO>(
    "/products",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

const updateProductFn = async (
  token: string,
  updateProduct: UpdateProductRequestDTO
): Promise<UpdateProductResponseDTO> => {
  const formData = new FormData();

  if (!updateProduct.image) {
    toast.error("Selecione uma imagem!");
    throw new Error("Imagem não informada");
  }

  formData.append("name", updateProduct.name);
  formData.append("description", updateProduct.description);
  formData.append("image", updateProduct.image);
  formData.append("price", String(updateProduct.price));

  const { data: response } = await api.put<UpdateProductResponseDTO>(
    `/products/${updateProduct.id}`,
    updateProduct,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

const deleteProductFn = async (
  token: string,
  deleteProduct: DeleteProductRequestDTO
): Promise<DeleteProductResponseDTO> => {
  const { data: response } = await api.delete<DeleteProductResponseDTO>(
    `/products/${deleteProduct.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const useProduct = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => fetcherProduct(id),
    queryKey: ["product", id],
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10min
  });

  const product = data || null;
  return { product, error, isLoading };
};

export const useProductMutation = () => {
  const { token } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: createProduct } = useMutation({
    mutationFn: (payload: CreateProductRequestDTO) =>
      createProductFn(token!, payload!),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: (payload: UpdateProductRequestDTO) =>
      updateProductFn(token!, payload!),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (payload: DeleteProductRequestDTO) =>
      deleteProductFn(token!, payload!),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onSuccess: async (_data, variables) => {
      const product = await fetcherProduct(variables.id);

      const searchParams = new URLSearchParams({
        "success-msg": `"${product.name}" deletado(a) com sucesso!`,
      });

      router.push(`/?${searchParams.toString()}`);
    },
    onError: async (error, variables) => {
      const product = await fetcherProduct(variables.id);

      const params = new URLSearchParams({
        productId: variables.id,
      });

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          params.append("error-msg", "Não autorizado!");
          router.push(`/auth/login?${params.toString()}`);
        } else if (error.response?.status === 403) {
          params.append("error-msg", "Função de administrador necessária!");
          router.push(`/auth/login?${params.toString()}`);
        } else {
          params.append("error-msg", `"${product.name}" não encontrado!`);
        }
      } else {
        params.append("error-msg", `Erro ao deletar "${product.name}"!`);
      }

      router.push(`/cart?${params.toString()}`);
    },
  });

  return { createProduct, updateProduct, deleteProduct };
};
