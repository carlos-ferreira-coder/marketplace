"use client";

import { FilterBar } from "@/components/filterBar";
import { PageBar } from "@/components/pageBar";
import { ProductList } from "@/components/productsList";
import styled from "styled-components";

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  min-height: 100vh;
  gap: 32px;

  @media (min-width: 768px) {
    padding: 34px 150px;
  }
`;

export default function Home() {
  return (
    <PageWrapper>
      <FilterBar />
      <PageBar />
      <ProductList />
      <PageBar />
    </PageWrapper>
  );
}
