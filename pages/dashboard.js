import Link from "next/link";
import React from "react";

export default function Dashboard() {
  return (
    <div>
      <main>
        <h1>Dashboard</h1>
        <Link href="../">
          <a>Upload Receipt</a>
        </Link>
      </main>
    </div>
  );
}
