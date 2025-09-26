import { ProductResponseDTO } from "./ProductResponseDTO";

export interface ProductsResponseDTO {
  page: number;
  limit: number;
  total: number;
  products: ProductResponseDTO[];
}
