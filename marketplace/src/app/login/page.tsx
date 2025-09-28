"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { searchParamsMsg } from "@/utils/msg";
import { useAuth } from "@/hooks/useAuth";
import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();

  searchParamsMsg(searchParams);

  const handleLogin = async (request: LoginRequestDTO) => {
    const response = await login(request);

    if (!response.success) {
      toast.error(response.error);
      return;
    }

    const params = new URLSearchParams({
      "success-msg": `Seja bem-vindo, ${response.data.user.name}!`,
    });

    const product = searchParams.get("product");
    if (product) {
      router.push(`/product/${product}?${params}`);
    }

    router.push(`/?${params}`);
  };
}
