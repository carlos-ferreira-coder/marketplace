"use client";

import { FilterBar } from "@/components/filterBar";
import styles from "./page.module.css";
import { PageBar } from "@/components/pageBar";
import { ProductList } from "@/components/productsList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FilterBar />
        <PageBar />
        <ProductList />
        <PageBar />
      </main>
    </div>
  );
}
