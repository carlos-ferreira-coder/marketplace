"use client";

import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { CartResponseDTO } from "@/types/dto/cart/cartResponseDTO";
import { numberToBrl } from "@/utils/numberToBrl";
import styled from "styled-components";

const CartResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 352px;
  padding: 16px 24px;

  background: white;

  h3 {
    font-weight: 600;
    font-size: 20px;
    color: var(--text-dark-2);
    text-transform: uppercase;
    margin-bottom: 30px;
  }
`;

const TotalItem = styled.div<{ isBold: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  font-weight: ${(props) => (props.isBold ? "600" : "400")};
  font-size: 16px;
  line-height: 150%;

  margin-bottom: 12px;
`;

interface CartResultProps {
  cart: CartResponseDTO;
}

export const CartResult = ({ cart }: CartResultProps) => {
  const deliveryFee = 40;

  return (
    <CartResultContainer>
      <h3>Resumo do Pedido</h3>

      <TotalItem isBold={false}>
        <p>Subtotal de produtos</p>
        <p>{cart.totalPrice}</p>
      </TotalItem>

      <TotalItem isBold={false}>
        <p>Entrega</p>
        <p>{numberToBrl(deliveryFee)}</p>
      </TotalItem>

      <Divider />

      <TotalItem isBold>
        <p>Total</p>
        <p>{numberToBrl(cart.totalPrice + deliveryFee)}</p>
      </TotalItem>

      <Button
        background="success"
        textTransform="uppercase"
        style={{ marginTop: "40px" }}
      >
        FINALIZAR COMPRA
      </Button>
    </CartResultContainer>
  );
};
