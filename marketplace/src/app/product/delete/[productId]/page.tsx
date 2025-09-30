"use client";

import { useProductMutation } from "@/hooks/useProduct";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductDelete() {
  const { deleteProduct } = useProductMutation();
  const { productId } = useParams<{ productId: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!productId) {
      const param = new URLSearchParams({ "error-msg": "Informe um produto!" });
      router.push(`/?${param.toString()}`);
    }

    deleteProduct({ productId: productId });
  }, [productId, router, deleteProduct]);

  return <></>;
}
