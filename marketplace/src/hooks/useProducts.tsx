import { api } from "@/services/axios";
import { ProductsResponseDTO } from "@/types/dto/products/ProductsResponseDTO";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "./useFilter";
import { FilterContextType } from "@/contexts/filterContexts";
import { toast } from "react-toastify";

const fetcher = async (
  params: string,
  filter: FilterContextType
): Promise<ProductsResponseDTO | void> => {
  try {
    const { data: response } = await api.get<ProductsResponseDTO>(
      `/products?${params}`
    );

    filter.setPage(response.page);
    filter.setLimit(response.limit);
    filter.setTotal(response.total);

    return response;
  } catch (error) {
    console.log(error);
    toast.error("Error fetching products");
  }
};

const mountParams = ({
  page,
  limit,
  type,
  priority,
  name,
  description,
  price,
}: FilterContextType) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  //if (type) params.append("type", type.toString());
  //if (priority) params.append("priority", priority.toString());

  if (name) params.append("name", name);
  if (description) params.append("description", description);
  if (price) params.append("price", price.toString());

  return params.toString();
};

// TODO filter by type e set priority
export const useProducts = () => {
  const filter = useFilter();
  const params = mountParams(filter);

  const { data } = useQuery({
    queryFn: () => fetcher(params, filter),
    queryKey: [
      "products",
      filter.page,
      filter.limit,
      filter.name,
      filter.description,
      filter.price,
      filter.type,
      filter.priority,
    ],
  });

  return {
    data: data,
  };
};
