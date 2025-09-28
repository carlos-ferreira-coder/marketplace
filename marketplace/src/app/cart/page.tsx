"use client";

import { useCart } from "@/hooks/useCart";
import { searchParamsMsg } from "@/utils/msg";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const { cart, error } = useCart();
  const searchParams = useSearchParams();

  searchParamsMsg(searchParams);

  if (error) {
    let params = new URLSearchParams({
      "error-msg": "Erro ao buscar o carrinho!",
    });

    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        params = new URLSearchParams({
          "error-msg": "Não autorizado!",
        });
      } else {
        params = new URLSearchParams({
          "error-msg": "Carrinho não encontrado!",
        });
      }
    }

    console.log(error);
    router.push(`/auth/login?${params}`);
  }

  return <p>Cart</p>;
}
