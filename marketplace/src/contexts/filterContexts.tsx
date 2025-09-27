"use client";

import { FilterPriority } from "@/types/filterPriority";
import { FilterType } from "@/types/filterType";
import { ReactNode, createContext, useState } from "react";

export interface FilterContextsProps {
  search: string;
  type: FilterType;
  priority: FilterPriority;
  name: string | null;
  description: string | null;
  price: number | null;
  setSearch: (search: string) => void;
  setType: (type: FilterType) => void;
  setPriority: (priority: FilterPriority) => void;
  setName: (name: string | null) => void;
  setDescription: (description: string | null) => void;
  setPrice: (price: number | null) => void;
}

export const FilterContexts = createContext<FilterContextsProps>({
  search: "",
  type: FilterType.ALL,
  priority: FilterPriority.NEWS,
  name: null,
  description: null,
  price: null,
  setSearch: () => {},
  setType: () => {},
  setPriority: () => {},
  setName: () => {},
  setDescription: () => {},
  setPrice: () => {},
});

interface FilterContextsProviderProps {
  children: ReactNode;
}

export const FilterContextsProvider = ({
  children,
}: FilterContextsProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<FilterType>(FilterType.ALL);
  const [priority, setPriority] = useState<FilterPriority>(FilterPriority.NEWS);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  return (
    <FilterContexts.Provider
      value={{
        search,
        type,
        priority,
        name,
        description,
        price,
        setSearch,
        setType,
        setPriority,
        setName,
        setDescription,
        setPrice,
      }}
    >
      {children}
    </FilterContexts.Provider>
  );
};
