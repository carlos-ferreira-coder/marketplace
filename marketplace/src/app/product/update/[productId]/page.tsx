"use client";

import { DefaultLayout } from "@/components/default/layout";
import { UpdateProductForm } from "@/components/form/product/update";
import { useProductMutation } from "@/hooks/useProduct";
import { searchParamsMsg } from "@/utils/msg";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function UpdateProduct() {
  const searchParams = useSearchParams();
  const { updateProduct } = useProductMutation();
  const { productId } = useParams<{ productId: string }>();
  const router = useRouter();

  useEffect(() => {
    searchParamsMsg(searchParams);
  }, [searchParams]);

  useEffect(() => {
    if (!productId) {
      const param = new URLSearchParams({ "error-msg": "Informe um produto!" });
      router.push(`/?${param.toString()}`);
      return;
    }
  }, [productId, router]);

  return (
    <DefaultLayout>
      <UpdateProductForm submitFn={updateProduct} productId={productId} />
    </DefaultLayout>
  );
}
