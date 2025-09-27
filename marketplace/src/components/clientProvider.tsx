// src/components/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextsProvider } from "@/contexts/authContexts";
import { FilterContextsProvider } from "@/contexts/filterContexts";
import { PageContextsProvider } from "@/contexts/pageContexts";

interface ClientProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextsProvider>
        <FilterContextsProvider>
          <PageContextsProvider>{children}</PageContextsProvider>
        </FilterContextsProvider>
      </AuthContextsProvider>
    </QueryClientProvider>
  );
};
