import { api } from "@/services/axios";
import { ProductResponseDTO } from "@/types/dto/products/productResponseDTO";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const fetcher = async (id: string): Promise<ProductResponseDTO | void> => {
  try {
    const { data: response } = await api.get<ProductResponseDTO>(
      `/products/${id}`
    );

    // TODO remover production
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await sleep(500);
    console.log("Executado depois de 5 segundos");

    return response;
  } catch (error) {
    console.log(error);
    toast.error("Error fetching products");
  }
};

export const useProduct = (id: string) => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetcher(id),
    queryKey: ["product", id],
    enabled: !!id,
  });

  return { data, isLoading };
};
