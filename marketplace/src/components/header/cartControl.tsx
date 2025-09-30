"use client";

import { useCart } from "../../hooks/useCart";
import styled from "styled-components";
import { IconCart } from "../icons/cart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { Loader } from "../loader";
import { useAuth } from "@/hooks/useAuth";

const DivContainer = styled.div`
  position: relative;
  cursor: pointer;
  border: none;
  background: transparent;
  top: 3px;

  color: var(--text-dark);
`;

const CartCountItems = styled.span`
  width: 17px;
  height: 17px;
  border-radius: 100%;
  padding: 0 5px;
  font-size: 10px;

  background-color: var(--orange-low);
  color: white;

  margin-left: -10px;
`;

export const CartControl = () => {
  const auth = useAuth();
  const { cart, error, isLoading } = useCart();
  const router = useRouter();

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
    cart &&
    auth.role === "USER" && (
      <DivContainer onClick={() => router.push("/cart")}>
        <IconCart />
        {cart.totalItems > 0 && (
          <CartCountItems>{cart.totalItems}</CartCountItems>
        )}
      </DivContainer>
    )
  );
};
