"use client";

import { BackBtn } from "@/components/backButton";
import { DefaultLayout } from "@/components/default/defaultLayout";
import { IconLoader, Loader } from "@/components/loader";
import { useProduct } from "@/hooks/useProduct";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { ProductDetails } from "./productDetails";

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
  const params = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(params.id);

  if (isLoading) return <Loader icon={IconLoader.spinner} />;
  if (!product) return <Loader icon={IconLoader.spinner} />;

  return (
    <DefaultLayout>
      <DivContainer>
        <BackBtn navigate="/" />
        <SectionContainer>
          <img src={product.imageUrl} />
          <ProductDetails product={product} />
        </SectionContainer>
      </DivContainer>
    </DefaultLayout>
  );
}
