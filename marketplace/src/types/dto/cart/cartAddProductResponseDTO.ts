import { ProductResponseDTO } from "../product/productResponseDTO";

export interface CartAddProductResponseDTO {
  product: ProductResponseDTO;
  quantity: number;
}
