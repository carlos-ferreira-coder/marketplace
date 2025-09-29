"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./productCart";
import styled from "styled-components";
import { Loader } from "../../loader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 32px;
  max-width: 100%;
  justify-content: center;
`;

export const ProductList = () => {
  const router = useRouter();
  const { products, error, isLoading } = useProducts();

  useEffect(() => {
    if (error) {
      const params = new URLSearchParams();

      if (axios.isAxiosError(error)) {
        params.append("error-msg", "Produto não encontrado!");
      } else {
        params.append("error-msg", "Erro ao buscar o produto!");
      }

      router.push(`/?${params.toString()}`);
    }
  }, [error, router]);

  if (isLoading) return <Loader />;

  return (
    <ListContainer>
      {products?.products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ListContainer>
  );
};
