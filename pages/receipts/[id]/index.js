import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function Receipt() {
  return (
    <div style={styles.container}>
      <Head>
        <title>Tangent</title>
      </Head>
      <main>
        <h1>Receipt</h1>
        <Link href="../dashboard">
          <a>Back to Dashboard</a>
        </Link>
      </main>
    </div>
  );
}
