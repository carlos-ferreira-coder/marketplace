import { PageContexts } from "@/contexts/pageContexts";
import { useContext } from "react";

export const usePage = () => {
  return useContext(PageContexts);
};
