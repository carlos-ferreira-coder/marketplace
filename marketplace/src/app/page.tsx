"use client";

import { DefaultLayout } from "@/components/default/layout";
import { FilterBar } from "@/components/filterBar";
import { PageBar } from "@/components/pageBar";
import { ProductList } from "@/components/product/list";
import { searchParamsMsg } from "@/utils/msg";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParamsMsg(searchParams);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    const productId = searchParams.get("productId");
    if (productId) {
      const successMsg = searchParams.get("success-msg");
      if (successMsg) params.append("success-msg", successMsg);

      router.push(`/product/${productId}?${params.toString()}`);
      return;
    }
  }, [router, searchParams]);

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
