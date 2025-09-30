"use client";

import { DefaultLayout } from "@/components/default/layout";
import { FilterBar } from "@/components/filterBar";
import { PageBar } from "@/components/pageBar";
import { ProductList } from "@/components/product/list";
import { searchParamsMsg } from "@/utils/msg";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParamsMsg(searchParams);
  }, [searchParams]);

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
