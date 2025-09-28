"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { searchParamsMsg } from "@/utils/msg";
import { useAuth } from "@/hooks/useAuth";
import { LoginRequestDTO } from "@/types/dto/user/loginRequestDTO";
import { toast } from "react-toastify";
import { DefaultLayout } from "@/components/default/defaultLayout";
import { LoginForm } from "../../../components/form/auth/login";

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

    const productId = searchParams.get("productId");
    if (productId) {
      router.push(`/product/${productId}?${params.toString()}`);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <DefaultLayout>
      <LoginForm login={handleLogin} />
    </DefaultLayout>
  );
}
