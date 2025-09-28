import { ProductResponseDTO } from "../product/productResponseDTO";

export interface CartDecreaseQuantityResponseDTO {
  message: string;
  product: ProductResponseDTO;
  quantity: number;
}
