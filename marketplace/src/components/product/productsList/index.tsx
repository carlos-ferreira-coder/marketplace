"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./productCart";
import styled from "styled-components";
import { IconLoader, Loader } from "../../loader";
import { toast } from "react-toastify";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 32px;
  max-width: 100%;
  justify-content: center;
`;

export const ProductList = () => {
  const { products, error, isLoading } = useProducts();

  if (error) toast.error("Erro ao buscar os produtos!");

  if (isLoading) return <Loader icon={IconLoader.spinner} />;

  return (
    <ListContainer>
      {products?.products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ListContainer>
  );
};
