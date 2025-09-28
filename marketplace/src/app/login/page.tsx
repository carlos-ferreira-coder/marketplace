"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { searchParamsMsg } from "@/utils/msg";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  searchParamsMsg(searchParams);

  const login = () => {
    // TODO set user
    const user = "";

    const params = new URLSearchParams({
      "success-msg": `Seja bem-vindo, ${user}!`,
    });

    const product = searchParams.get("product");
    if (product) router.push(`/product/${product}?${params}`);
    router.push(`/?${params}`);
  };
}
