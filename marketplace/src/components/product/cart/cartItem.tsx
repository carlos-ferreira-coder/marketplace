import { useCartMutation } from "@/hooks/useCart";
import { ItemsResponseDTO } from "@/types/dto/cart/itemsResponseDTO";
import { numberToBrl } from "@/utils/numberToBrl";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

interface CartItemProps {
  item: ItemsResponseDTO;
}

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 210px;

  border-radius: 8px;
  background-color: white;

  position: relative;

  button {
    position: absolute;
    top: 16px;
    right: 24px;

    border: none;
    background: transparent;
    cursor: pointer;
  }

  img {
    max-height: 100%;
    width: 256px;
    border-radius: 8px 0 0 8px;
  }

  > div {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 16px 24px;
    line-height: 150%;
    color: var(--text-dark-2);

    h4 {
      font-weight: 300;
      font-size: 20px;
    }

    p {
      font-weight: 400;
      font-size: 12px;
      max-height: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      span {
        font-weight: 600;
        font-size: 16px;
        color: var(--shapes-dark);
      }
    }
  }
`;

const SelectQuantity = styled.select`
  padding: 8px;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-secondary);
  color: var(--text-dark);
  font-weight: 400;
  font-size: 16px;
`;

export function CartItem({ item }: CartItemProps) {
  const router = useRouter();
  const { cartAddProduct, cartRemoveProduct, cartDecreaseQuantity } =
    useCartMutation();

  const handleAddProduct = (quantity: number) => {
    const cartAddProductData = {
      productId: item.product.id,
      quantity: quantity,
    };

    cartAddProduct(cartAddProductData, {
      onError: (error: unknown) => {
        const params = new URLSearchParams();

        if (axios.isAxiosError(error)) {
          params.append("error-msg", "Não autorizado!");
        } else {
          params.append("error-msg", "Erro ao adicionar produto ao carrinho!");
        }

        router.push(`/cart?${params.toString()}`);
      },
    });
  };

  const handleDecreaseQuantity = (quantity: number) => {
    const cartDecreaseQuantityData = {
      productId: item.product.id,
      quantity: quantity,
    };

    cartDecreaseQuantity(cartDecreaseQuantityData, {
      onError: (error: unknown) => {
        const params = new URLSearchParams();

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            params.append("error-msg", "Não autorizado!");
          } else {
            params.append("error-msg", "Produto não encontrado no carrinho!");
          }
        } else {
          params.append("error-msg", "Erro ao diminuir produto do carrinho!");
        }

        router.push(`/cart?${params.toString()}`);
      },
    });
  };

  const handleRemoveProduct = () => {
    const cartRemoveProductData = {
      productId: item.product.id,
    };

    cartRemoveProduct(cartRemoveProductData, {
      onError: (error: unknown) => {
        const params = new URLSearchParams();

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            params.append("error-msg", "Não autorizado!");
          } else {
            params.append("error-msg", "Produto não encontrado no carrinho!");
          }
        } else {
          params.append("error-msg", "Erro ao remover produto do carrinho!");
        }

        router.push(`/cart?${params.toString()}`);
      },
    });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > item.quantity) {
      handleAddProduct(newQuantity - item.quantity);
    } else if (newQuantity < item.quantity) {
      handleDecreaseQuantity(item.quantity - newQuantity);
    }
  };

  return (
    <Item>
      <button onClick={handleRemoveProduct} aria-label="Excluir">
        <FontAwesomeIcon icon={faTrash} />
      </button>

      <img src={item.product.imageUrl} />

      <div>
        <h4>{item.product.name}</h4>
        <p>{item.product.description}</p>

        <div>
          <SelectQuantity
            value={item.quantity}
            onChange={(event) =>
              handleUpdateQuantity(Number(event.target.value))
            }
          >
            {
              // TODO storage ? storage : item.quantity + 3
              Array.from({ length: item.quantity + 3 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))
            }
          </SelectQuantity>
          <span>{numberToBrl(item.itemTotal)}</span>
        </div>
      </div>
    </Item>
  );
}
