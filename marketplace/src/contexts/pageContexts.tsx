"use client";

import { ReactNode, createContext, useState } from "react";

export interface PageContextsProps {
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
}

export const PageContexts = createContext<PageContextsProps>({
  page: 1,
  limit: 10,
  total: 0,
  setPage: () => {},
  setLimit: () => {},
  setTotal: () => {},
});

interface PageContextsProviderProps {
  children: ReactNode;
}

export const PageContextsProvider = ({
  children,
}: PageContextsProviderProps) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  return (
    <PageContexts.Provider
      value={{
        page,
        limit,
        total,
        setPage,
        setLimit,
        setTotal,
      }}
    >
      {children}
    </PageContexts.Provider>
  );
};
