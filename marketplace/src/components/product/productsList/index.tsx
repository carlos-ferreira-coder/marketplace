"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./productCart";
import styled from "styled-components";
import { Loader } from "../../loader";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 32px;
  max-width: 100%;
  justify-content: center;
`;

export const ProductList = () => {
  const { products, error, isLoading } = useProducts();

  useEffect(() => {
    if (error) toast.error("Erro ao buscar os produtos!");
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <ListContainer>
      {products?.products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ListContainer>
  );
};
