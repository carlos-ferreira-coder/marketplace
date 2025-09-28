"use client";

import { ReadonlyURLSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export const searchParamsMsg = (searchParams: ReadonlyURLSearchParams) => {
  const successMsg = searchParams.get("success-msg");
  if (successMsg) toast.success(successMsg);

  const errorMsg = searchParams.get("error-msg");
  if (errorMsg) toast.success(errorMsg);
};
