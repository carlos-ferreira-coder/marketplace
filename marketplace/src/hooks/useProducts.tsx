import { api } from "@/services/axios";
import { ProductsResponseDTO } from "@/types/dto/products/ProductsResponseDTO";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "./useFilter";
import { FilterContextType } from "@/contexts/filterContexts";
import { toast } from "react-toastify";
import { useDeferredValue, useState } from "react";

const fetcher = async (
  params: string,
  filter: FilterContextType,
  setIsLoading: (value: boolean) => void
): Promise<ProductsResponseDTO | void> => {
  try {
    setIsLoading(true);

    const { data: response } = await api.get<ProductsResponseDTO>(
      `/products?${params}`
    );

    filter.setPage(response.page);
    filter.setLimit(response.limit);
    filter.setTotal(response.total);

    setIsLoading(false);
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Error fetching products");
  }
};

const mountParams = ({
  page,
  limit,
  search,
  type,
  priority,
  name,
  description,
  price,
}: FilterContextType) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  //if (search) params.append("search", search);
  //if (type) params.append("type", type.toString());
  //if (priority) params.append("priority", priority.toString());

  if (name) params.append("name", name);
  if (description) params.append("description", description);
  if (price) params.append("price", price.toString());

  return params.toString();
};

// TODO filter by (search, type, priority)
// TODO Search implementado na gambiarra concertar! kkkkkk
export const useProducts = () => {
  const filter = useFilter();
  const params = mountParams(filter);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchDeferred = useDeferredValue(filter.search);
  const regexSearchDeferred = new RegExp(searchDeferred, "i");

  const { data: productsResponse } = useQuery({
    queryFn: () => fetcher(params, filter, setIsLoading),
    queryKey: [
      "products",
      filter.page,
      filter.limit,
      //searchDeferred,
      filter.type,
      filter.priority,
      filter.name,
      filter.description,
      filter.price,
    ],
  });

  if (!productsResponse?.products) return { data: productsResponse };

  const productsFiltered = productsResponse.products.filter(
    (product) =>
      regexSearchDeferred.test(product.name) ||
      regexSearchDeferred.test(product.description)
  );

  return {
    data: {
      ...productsResponse,
      products: productsFiltered,
    },
    isLoading,
  };
};
