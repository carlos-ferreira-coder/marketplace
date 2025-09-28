"use client";

import { BackBtn } from "@/components/backButton";
import { DefaultLayout } from "@/components/default/defaultLayout";
import { IconLoader, Loader } from "@/components/loader";
import { useProduct } from "@/hooks/useProduct";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { ProductDetails } from "./productDetails";
import axios from "axios";

const DivContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 24px;
  width: 100%;
  gap: 32px;

  img {
    width: 50%;
    max-width: 640px;
    object-fit: cover;

    @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
      height: 100vh;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    flex-direction: row;
    align-items: start;
  }
`;

export default function Product() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { product, error, isLoading } = useProduct(params.id);

  if (isLoading) return <Loader icon={IconLoader.spinner} />;

  if (error) {
    let params = new URLSearchParams({
      "error-msg": "Erro ao buscar o produto!",
    });

    if (axios.isAxiosError(error) && error.response) {
      params = new URLSearchParams({
        "error-msg": "Produto não encontrado!",
      });
    }

    router.push(`/?${params}`);
  }

  return (
    <DefaultLayout>
      {product && (
        <DivContainer>
          <BackBtn navigate="/" />
          <SectionContainer>
            <img src={product.imageUrl} />
            <ProductDetails product={product} />
          </SectionContainer>
        </DivContainer>
      )}
    </DefaultLayout>
  );
}
