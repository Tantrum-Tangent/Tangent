import Link from "next/link";
import React, { useEffect } from "react";
import { db } from "../firebase.config";
import { query, collection, getDocs, orderByChild } from "firebase/firestore"; 

export default function Dashboard(props) {
    const {receiptsData} = props
    useEffect(() => {
      console.log(receiptsData)
    }, [receiptsData])
  return (
    <div>
      <main>
        <h1>Dashboard</h1>
        <Link href="../">
          <a>Upload Receipt</a>
        </Link>
        {receiptsData.map(receipt => (
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
  const q = query(collection(db, 'receipts'));
  const receipts = await getDocs(q);
  const receiptsData = receipts.docs.map((receipt) => ({
    id: receipt.id,
    ...receipt.data(),
  }));
  return {
    props: {
      receiptsData,
    },
    revalidate: 1,
  };
};
