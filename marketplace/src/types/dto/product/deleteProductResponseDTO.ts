import { ProductResponseDTO } from "./productResponseDTO";

export interface DeleteProductResponseDTO {
  message: string;
  product: ProductResponseDTO;
}
