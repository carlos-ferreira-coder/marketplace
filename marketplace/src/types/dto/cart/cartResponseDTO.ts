import { ItemsResponseDTO } from "./itemsResponseDTO";

export interface CartResponseDTO {
  cartId: string;
  userId: string;
  items: ItemsResponseDTO[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
