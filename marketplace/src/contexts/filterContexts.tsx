"use client";

import { FilterPriority } from "@/types/FilterPriority";
import { FilterType } from "@/types/FilterType";
import { ReactNode, createContext, useState } from "react";

export interface FilterContextType {
  page: number;
  limit: number;
  total: number;
  type: FilterType;
  priority: FilterPriority;
  name: string | null;
  description: string | null;
  price: number | null;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  setType: (type: FilterType) => void;
  setPriority: (priority: FilterPriority) => void;
  setName: (name: string | null) => void;
  setDescription: (description: string | null) => void;
  setPrice: (price: number | null) => void;
}

export const FilterContext = createContext<FilterContextType>({
  page: 1,
  limit: 10,
  total: 0,
  type: FilterType.ALL,
  priority: FilterPriority.NEWS,
  name: null,
  description: null,
  price: null,
  setPage: () => {},
  setLimit: () => {},
  setTotal: () => {},
  setType: () => {},
  setPriority: () => {},
  setName: () => {},
  setDescription: () => {},
  setPrice: () => {},
});

interface FilterContextProviderProps {
  children: ReactNode;
}

export function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [type, setType] = useState<FilterType>(FilterType.ALL);
  const [priority, setPriority] = useState<FilterPriority>(FilterPriority.NEWS);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  return (
    <FilterContext.Provider
      value={{
        page,
        limit,
        total,
        type,
        priority,
        name,
        description,
        price,
        setPage,
        setLimit,
        setTotal,
        setType,
        setPriority,
        setName,
        setDescription,
        setPrice,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
