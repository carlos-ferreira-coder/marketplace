"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  logout();

  const params = new URLSearchParams({
    "success-msg": "Deslogado com sucesso!",
  });

  router.push(`/?${params.toString()}`);
}
