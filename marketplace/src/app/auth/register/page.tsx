"use client";

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

  handleRegister({
    name: "test",
    email: "abacate@abacate.com",
    password: "@A1b2C3d4",
    phone: "00000000000",
    cpf: "99999922999",
  });
}
