"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./productCart";
import styled from "styled-components";
import { IconLoader, Loader } from "../loader";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 32px;
  max-width: 100%;
  justify-content: center;
`;

export const ProductList = () => {
  const { data: products, isLoading } = useProducts();

  if (isLoading) return <Loader icon={IconLoader.spinner} />;

  return (
    <ListContainer>
      {products?.products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ListContainer>
  );
};
