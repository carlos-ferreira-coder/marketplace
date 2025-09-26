"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./productCart";
import styled from "styled-components";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 32px;
  max-width: 100%;
`;

export const ProductList = () => {
  const { data } = useProducts();

  return (
    <ListContainer>
      {data?.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ListContainer>
  );
};
