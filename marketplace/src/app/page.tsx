import { FilterBar } from "@/components/filterBar";
import styles from "./page.module.css";
import { PageBar } from "@/components/pageBar";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FilterBar />
        <PageBar />
      </main>
    </div>
  );
}
