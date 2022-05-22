import React from "react";
import styles from "../styles/Dashboard.module.css";
import Header from "../components/header";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.listOfUploads}>
          {
            //for each upload insert div
          }
          <div>upload 1</div>
          <div>upload 2</div>
          <div>upload 3</div>
          <div>upload 4</div>
          <div>upload 5</div>
          <div>upload 6</div>
        </div>
      </main>
    </div>
  );
}
