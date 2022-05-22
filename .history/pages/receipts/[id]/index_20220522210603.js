import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { db } from "../../../firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import styles from "../../styles/Home.module.css";

export default function Receipt(props) {
  const { receiptData } = props
  return (
    <div >
      <Head>
        <title>Tangent</title>
      </Head>
      <main>
        <h1>{receiptData.company}</h1>
        <Link href="../dashboard">
          <a>Back to Dashboard</a>
        </Link>
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  const receipts = await getDocs(collection(db, "receipts"))
  const paths = receipts.docs.map((receipt) => ({
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
  const receiptData = await getDoc(doc(db, "receipts", id))
  return {
    props: {
      receiptData: {
        id: receiptData.id,
        ...receiptData.data()
      },
    },
    revalidate: 10,
  };
};
