import { ProductResponseDTO } from "./productResponseDTO";

export interface ProductsResponseDTO {
  page: number;
  limit: number;
  total: number;
  products: ProductResponseDTO[];
}
