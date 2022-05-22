import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="./dashboard">
        <a className={styles.link}>Dashboard</a>
      </Link>
      <h1 className={styles.title}>Tangent</h1>
      <Link href="./">
        <a className={styles.link}>Upload Receipt</a>
      </Link>
    </div>
  );
}
