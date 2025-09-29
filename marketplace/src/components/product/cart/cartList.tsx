"use client";

import { CartResponseDTO } from "@/types/dto/cart/cartResponseDTO";
import { CartItem } from "./cartItem";
import styled from "styled-components";
import { BackBtn } from "@/components/backButton";
import { numberToBrl } from "@/utils/numberToBrl";

const CartListContainer = styled.div`
  h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 150%;
    text-transform: uppercase;
    color: var(--text-dark-2);
    margin-top: 24px;
  }

  p {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);

    span {
      margin-left: 12px;
      font-weight: 600;
    }
  }
`;

const CartListItem = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

interface CartListProps {
  cart: CartResponseDTO;
}

export const CartList = ({ cart }: CartListProps) => {
  return (
    <CartListContainer>
      <BackBtn navigate="/" />

      <h3>Seu carrinho</h3>
      <p>
        Total ({cart.totalItems} produtos)
        <span>{numberToBrl(cart.totalPrice)}</span>
      </p>

      <CartListItem>
        {cart.items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </CartListItem>
    </CartListContainer>
  );
};
