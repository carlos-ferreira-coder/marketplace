import { FilterContext } from "@/contexts/filterContexts";
import { useContext } from "react";

export const useFilter = () => {
  return useContext(FilterContext);
};
