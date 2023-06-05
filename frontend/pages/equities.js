import React from 'react';
import VolTable from '../components/table';
import Navbar from "../components/navbar/navbar";
import styles from '../app/page.module.css';

const MyPage = () => {
  return (
    <div>
      <Navbar />
      <h1 className={styles.pagetitle}>Equity Volatilities</h1>
      <VolTable/>
    </div>
  );
};

export default MyPage;