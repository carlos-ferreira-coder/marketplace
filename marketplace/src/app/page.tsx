"use client";

import { DefaultLayout } from "@/components/default/defaultLayout";
import { FilterBar } from "@/components/filterBar";
import { PageBar } from "@/components/pageBar";
import { ProductList } from "@/components/productsList";
import styled from "styled-components";

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  return (
    <DefaultLayout>
      <PageWrapper>
        <FilterBar />
        <PageBar />
        <ProductList />
        <PageBar />
      </PageWrapper>
    </DefaultLayout>
  );
}
