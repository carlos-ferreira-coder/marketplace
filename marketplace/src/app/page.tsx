"use client";

import { FilterBar } from "@/components/filterBar";
import styles from "./page.module.css";
import { PageBar } from "@/components/pageBar";
import { ProductList } from "@/components/productsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div className={styles.page}>
        <main className={styles.main}>
          <FilterBar />
          <PageBar />
          <ProductList />
          <PageBar />
        </main>
      </div>
    </QueryClientProvider>
  );
}
