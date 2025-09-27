"use client";

import { searchParamsMsg } from "@/utils/msg";
import { useSearchParams } from "next/navigation";

export default function Cart() {
  const searchParams = useSearchParams();

  searchParamsMsg(searchParams);

  return <p>Cart</p>;
}
