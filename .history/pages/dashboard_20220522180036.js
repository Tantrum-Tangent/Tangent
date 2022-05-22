import Link from "next/link";
import React from "react";
import { db } from "../firebase.config";
import { collection, getDocs, orderBy } from "firebase/firestore/lite"; 

export default function Dashboard(props) {
    const {receiptData} = props
  return (
    <div>
      <main>
        <h1>Dashboard</h1>
        <Link href="../">
          <a>Upload Receipt</a>
        </Link>
        {receiptData.map(receipt => (
            <div key={receipt.id}>
                <Link href={`receipts/${receipt.id}`}>
                    <a>{receipt.name}</a>
                </Link>
            </div>
        ))

        }
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const receipts = await db
    .collection("receipts")
    .orderBy("date", "desc")
    .getDocs();
  const receiptsData = receipts.docs.map((receipt) => ({
    id: receipt.id,
    ...receipt.data(),
  }));
  return {
    props: {
      receipts,
    },
    revalidate: 5,
  };
};
