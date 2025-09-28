"use client";

import { DefaultLayout } from "@/components/default/defaultLayout";
import { RegisterForm } from "@/components/form/auth/register";
import { useAuth } from "@/hooks/useAuth";
import { RegisterRequestDTO } from "@/types/dto/user/registerRequestDTO";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const searchParams = useSearchParams();

  const handleRegister = async (request: RegisterRequestDTO) => {
    const response = await register(request);

    if (!response.success) {
      toast.error(response.error);
      return;
    }

    const params = new URLSearchParams({
      "success-msg": `${response.data.user.name}, cadastrado com sucesso!`,
    });

    const productId = searchParams.get("productId");
    if (productId) params.append("productId", productId);

    router.push(`/auth/login?${params.toString()}`);
  };

  return (
    <DefaultLayout>
      <RegisterForm register={handleRegister} />
    </DefaultLayout>
  );
}
