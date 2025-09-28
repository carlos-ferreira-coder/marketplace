import { ProductResponseDTO } from "../product/productResponseDTO";

export interface CartRemoveProductResponseDTO {
  message: string;
  product: ProductResponseDTO;
}
