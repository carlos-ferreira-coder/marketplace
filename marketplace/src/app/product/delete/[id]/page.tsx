"use client";

import { useProductMutation } from "@/hooks/useProduct";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductDelete() {
  const { deleteProduct } = useProductMutation();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const deleteProductData = {
      id: params.id,
    };

    deleteProduct(deleteProductData, {
      onSuccess: () => {
        const searchParams = new URLSearchParams({
          "success-msg": "Produto deletado com sucesso!",
        });

        router.push(`/?${searchParams.toString()}`);
      },
      onError: (error: unknown) => {
        const searchParams = new URLSearchParams();

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            searchParams.append("error-msg", "Não autorizado!");
          } else if (error.response?.status === 403) {
            searchParams.append(
              "error-msg",
              "Função de administrador necessária!"
            );
          } else {
            searchParams.append("error-msg", "Erro ao deletar produto!");
          }
        }

        router.push(
          `/product/${deleteProductData.id}?${searchParams.toString()}`
        );
      },
    });
  }, [params, router, deleteProduct]);

  return null;
}
