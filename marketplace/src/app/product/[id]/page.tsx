"use client";

import { BackBtn } from "@/components/backButton";
import { DefaultLayout } from "@/components/default/defaultLayout";
import { Loader } from "@/components/loader";
import { useProduct } from "@/hooks/useProduct";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import axios from "axios";
import { ProductInfo } from "@/components/product/productInfo.tsx";
import { searchParamsMsg } from "@/utils/msg";
import { useEffect } from "react";

const DivContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
`;

export default function Product() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { product, error, isLoading } = useProduct(params.id);

  useEffect(() => {
    searchParamsMsg(searchParams);
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      let params = new URLSearchParams({
        "error-msg": "Erro ao buscar o produto!",
      });

      if (axios.isAxiosError(error)) {
        params = new URLSearchParams({
          "error-msg": "Produto não encontrado!",
        });
      }

      router.push(`/?${params.toString()}`);
    }
  }, [error, router]);

  if (isLoading) return <Loader />;

  return (
    <DefaultLayout>
      {product && (
        <DivContainer>
          <BackBtn navigate="/" />
          <ProductInfo product={product} />
        </DivContainer>
      )}
    </DefaultLayout>
  );
}
