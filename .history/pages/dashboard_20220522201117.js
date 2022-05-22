import Link from "next/link";
import React, { useEffect } from "react";
import { db } from "../firebase.config";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import styles from "../styles/Dashboard.module.css";
import Header from "../components/header";

export default function Dashboard(props) {
  const { receiptsData } = props;
  useEffect(() => {
    console.log(receiptsData);
  }, [receiptsData]);
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <h1>Dashboard</h1>
        <div className={styles.listOfUploads}>
          <Link href="../">
            <a>Upload Receipt</a>
          </Link>
          {receiptsData.map((receipt) => (
            <div key={receipt.id}>
              <Link href={`receipts/${receipt.id}`}>
                <a>{receipt.company}</a>
              </Link>
            </div>
          ))}

          <div>upload 1</div>
          <div>upload 2</div>
          <div>upload 3</div>
          {/* <div>upload 4</div>
          <div>upload 5</div>
          <div>upload 6</div> */}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const q = query(collection(db, "receipts"), orderBy("totalamt", "desc"));
  const receipts = await getDocs(q);
  const receiptsData = receipts.docs.map((receipt) => {
    return {
      id: receipt.id,
      ...receipt.data(),
    };
  });
  console.log(receiptsData);
  return {
    props: {
      receiptsData,
    },
    revalidate: 1,
  };
};
