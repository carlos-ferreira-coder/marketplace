import { ProductResponseDTO } from "../products/productResponseDTO";

export interface CartAddProductResponseDTO {
  product: ProductResponseDTO;
  quantity: number;
}
