import { api } from "@/services/axios";
import { ProductsResponseDTO } from "@/types/dto/product/productsResponseDTO";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "./useFilter";
import { useDeferredValue } from "react";
import { usePage } from "./usePage";
import { FilterContextsProps } from "@/contexts/filterContexts";
import { PageContextsProps } from "@/contexts/pageContexts";

const mountParams = (filter: FilterContextsProps, page: PageContextsProps) => {
  const params = new URLSearchParams();

  params.append("page", page.page.toString());
  params.append("limit", page.limit.toString());

  /*
  if (filter.search) params.append("search", filter.search);
  if (filter.type) params.append("type", filter.type.toString());
  if (filter.priority) params.append("priority", filter.priority.toString());
  */

  if (filter.name) params.append("name", filter.name);
  if (filter.description) params.append("description", filter.description);
  if (filter.price) params.append("price", filter.price.toString());

  return params;
};

const fetcher = async (
  filter: FilterContextsProps,
  page: PageContextsProps
): Promise<ProductsResponseDTO> => {
  const params = mountParams(filter, page);

  const { data: response } = await api.get<ProductsResponseDTO>(
    `/products?${params.toString()}`
  );

  // TODO remover in production
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Executado depois de 5 segundos");

  page.setPage(response.page);
  page.setLimit(response.limit);
  page.setTotal(response.total);

  return response;
};

// TODO filter by (search, type, priority)
// TODO Search implementado na gambiarra concertar! kkkkkk
export const useProducts = () => {
  const filter = useFilter();
  const page = usePage();

  const searchDeferred = useDeferredValue(filter.search);
  const regexSearchDeferred = new RegExp(searchDeferred, "i");

  const { data, error, isLoading } = useQuery({
    queryFn: () => fetcher(filter, page),
    queryKey: ["products", filter, page],
    staleTime: 1000 * 60 * 10, // 10min
  });

  const productsFiltered = data?.products.filter(
    (product) =>
      regexSearchDeferred.test(product.name) ||
      regexSearchDeferred.test(product.description)
  );

  return {
    products: {
      ...data,
      products: productsFiltered || null,
    },
    error,
    isLoading,
  };
};
