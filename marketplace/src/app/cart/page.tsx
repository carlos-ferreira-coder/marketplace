"use client";

import { BackBtn } from "@/components/backButton";
import { DefaultLayout } from "@/components/default/defaultLayout";
import { CartItem } from "@/components/product/item/cartItem";
import { useCart } from "@/hooks/useCart";
import { searchParamsMsg } from "@/utils/msg";
import { numberToBrl } from "@/utils/numberToBrl";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    flex-direction: row;
  }
`;

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
      font-weight: 600;
    }
  }
`;

const CartList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

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

const ShopBtn = styled.button`
  color: white;
  border-radius: 4px;
  background: var(--success-color);
  padding: 12px;
  width: 100%;
  border: none;
  margin-top: 40px;
  cursor: pointer;
`;

export default function Cart() {
  const router = useRouter();
  const { cart, error } = useCart();
  const searchParams = useSearchParams();

  searchParamsMsg(searchParams);

  console.log(`cart: ${cart}`);

  if (error) {
    const params = new URLSearchParams();

    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        params.append("error-msg", "Não autorizado!");
      } else if (error.response.status === 404) {
        params.append("error-msg", "Carrinho não encontrado!");
      } else {
        params.append("error-msg", "Erro ao buscar o carrinho!");
      }
    }

    console.log(error);
    router.push(`/auth/login?${params.toString()}`);
  }

  const deliveryFee = 40;

  return (
    <DefaultLayout>
      {cart && (
        <DivContainer>
          <CartListContainer>
            <BackBtn navigate="/" />
            <h3>Seu carrinho</h3>
            <p>
              Total {cart.totalItems} produtos
              <span>{cart.totalPrice}</span>
            </p>
            <CartList>
              {cart.items.map((item) => (
                <CartItem
                  product={item}
                  key={item.product.id}
                  handleDelete={() => handleDeleteItem()}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </CartList>
          </CartListContainer>
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
            <ShopBtn>FINALIZAR COMPRA</ShopBtn>
          </CartResultContainer>
        </DivContainer>
      )}
    </DefaultLayout>
  );
}
