"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    logout();

    const params = new URLSearchParams({
      "success-msg": "Deslogado com sucesso!",
    });

    router.push(`/?${params.toString()}`);
  }, [logout, router]);

  return null;
}
