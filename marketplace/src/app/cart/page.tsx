"use client";

import { DefaultLayout } from "@/components/default/layout";
import { Loader } from "@/components/loader";
import { CartList } from "@/components/product/cart/cartList";
import { CartResult } from "@/components/product/cart/cartResult";
import { useCart } from "@/hooks/useCart";
import { searchParamsMsg } from "@/utils/msg";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
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

export default function Cart() {
  const router = useRouter();
  const { cart, error, isLoading } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParamsMsg(searchParams);
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      const params = new URLSearchParams();

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          params.append("error-msg", "Não autorizado!");
        } else if (error.response.status === 404) {
          params.append("error-msg", "Carrinho não encontrado!");
        }
      } else {
        params.append("error-msg", "Erro ao buscar o carrinho!");
      }

      router.push(`/auth/login?${params.toString()}`);
    }
  }, [error, router]);

  if (isLoading) return <Loader />;

  return (
    <DefaultLayout>
      {cart && (
        <DivContainer>
          <CartList cart={cart} />
          <CartResult cart={cart} />
        </DivContainer>
      )}
    </DefaultLayout>
  );
}
