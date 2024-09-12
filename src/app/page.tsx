"use client";

import Modal from "./components/ui/Modal";
import DataTable from "./components/datatable";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <DataTable />
    </div>
  );
}
