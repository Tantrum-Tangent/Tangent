import Link from "next/link";
import React from "react";
import styles from "../styles/Dashboard.module.css";
import Header from "../components/header";

export default function Dashboard() {
  return (
    <div>
      <main>
        <Header />
        <h1 className={styles.t}>Dashboard</h1>
        <Link href="../">
          <a>Upload Receipt</a>
        </Link>
      </main>
    </div>
  );
}
