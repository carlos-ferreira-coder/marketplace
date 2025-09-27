"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextsProvider } from "@/contexts/authContexts";
import { FilterContextsProvider } from "@/contexts/filterContexts";
import { PageContextsProvider } from "@/contexts/pageContexts";
import { ThemeProvider } from "styled-components";

interface DefaultProvidersProps {
  children: ReactNode;
}

const theme = {
  breakpoint: {
    md: "768px",
    xl: "1200px",
  },
};

export const DefaultProviders = ({ children }: DefaultProvidersProps) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthContextsProvider>
          <FilterContextsProvider>
            <PageContextsProvider>{children}</PageContextsProvider>
          </FilterContextsProvider>
        </AuthContextsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
