import { api } from "@/services/axios";
import { ProductResponseDTO } from "@/types/dto/product/productResponseDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import axios from "axios";
import { CreateProductResponseDTO } from "@/types/dto/product/createProductResponseDTO";
import { CreateProductRequestDTO } from "@/types/dto/product/createProductRequestDTO";
import { UpdateProductRequestDTO } from "@/types/dto/product/updateProductRequestDTO";
import { UpdateProductResponseDTO } from "@/types/dto/product/updateProductResponseDTO";
import { DeleteProductRequestDTO } from "@/types/dto/product/deleteProductRequestDTO";
import { DeleteProductResponseDTO } from "@/types/dto/product/deleteProductResponseDTO";

const fetcher = async (id: string): Promise<ProductResponseDTO> => {
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
): Promise<CreateProductResponseDTO | void> => {
  try {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const msg =
        error.response.status === 401
          ? "Não autorizado!"
          : "Função de administrador necessária!";
      toast.error(msg);
      throw error;
    }

    console.log(error);
    toast.error("Erro ao remover produto no carrinho!");
    throw error;
  }
};

const updateProductFn = async (
  token: string,
  updateProduct: UpdateProductRequestDTO
): Promise<UpdateProductResponseDTO | void> => {
  try {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const msg =
        error.response.status === 401
          ? "Não autorizado!"
          : error.response.status === 403
          ? "Função de administrador necessária!"
          : "Produto não encontrado!";
      toast.error(msg);
      throw error;
    }

    console.log(error);
    toast.error("Erro ao remover produto no carrinho!");
    throw error;
  }
};

const deleteProductFn = async (
  token: string,
  deleteProduct: DeleteProductRequestDTO
): Promise<DeleteProductResponseDTO | void> => {
  try {
    const { data: response } = await api.delete<DeleteProductResponseDTO>(
      `/products/${deleteProduct.id}`,
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
          : error.response.status === 403
          ? "Função de administrador necessária!"
          : "Produto não encontrado!";
      toast.error(msg);
      throw error;
    }

    console.log(error);
    toast.error("Erro ao remover produto no carrinho!");
    throw error;
  }
};

export const useProduct = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => fetcher(id),
    queryKey: ["product", id],
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10min
  });

  const product = data || null;
  return { product, error, isLoading };
};

export const useProductMutation = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: createProduct } = useMutation({
    mutationFn: (createProduct: CreateProductRequestDTO) =>
      createProductFn(token!, createProduct!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: (updateProduct: UpdateProductRequestDTO) =>
      updateProductFn(token!, updateProduct!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (deleteProduct: DeleteProductRequestDTO) =>
      deleteProductFn(token!, deleteProduct!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  return { createProduct, updateProduct, deleteProduct };
};
