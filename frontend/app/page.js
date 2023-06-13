import React from 'react';
import styles from '../app/page.module.css'
import Navbar from '../components/navbar/navbar';
import VolTable from "@/components/table/table";

// change table to archived
export default function Home() {
  return (
    <div>
      <Navbar />
      <h1 className={styles.pagetitle}>Equity Volatilities</h1>
      <VolTable/>
    </div>
  )
}
