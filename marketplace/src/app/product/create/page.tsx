"use client";

import { DefaultLayout } from "@/components/default/layout";
import { CreateProductForm } from "@/components/form/product/create";
import { useProductMutation } from "@/hooks/useProduct";
import { searchParamsMsg } from "@/utils/msg";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CreateProduct() {
  const searchParams = useSearchParams();
  const { createProduct } = useProductMutation();

  useEffect(() => {
    searchParamsMsg(searchParams);
  }, [searchParams]);

  return (
    <DefaultLayout>
      <CreateProductForm submitFn={createProduct} />
    </DefaultLayout>
  );
}
