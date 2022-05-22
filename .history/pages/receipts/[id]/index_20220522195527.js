import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { db } from "../../../firebase.config";
import { collection } from "firebase/firestore";

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

export const getStaticPaths = async () => {
  const receipts = await getDocs(collection(db, "receipts"))
  const paths = receipts.map((receipt) => ({
    params: {
      id: receipt.id,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const receiptData = await db
    .collection("receipts")
    .doc(id)
    .get()
    .then((receipt) => receipt.data());
  return {
    props: {
      receiptData,
    },
    revalidate: 10,
  };
};
