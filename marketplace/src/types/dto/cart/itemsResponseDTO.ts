import { ProductResponseDTO } from "../products/productResponseDTO";

export interface ItemsResponseDTO {
  product: ProductResponseDTO;
  quantity: number;
  itemTotal: number;
}
