import React from 'react';
import SpreadTable from '../../components/spreadtable/spreadtable';
import Navbar from "../../components/navbar/navbar";
import styles from '../page.module.css';

const MyPage = () => {
  return (
    <div>
      <Navbar />
      <h1 className={styles.pagetitle}>Volatility Spreads</h1>
      <SpreadTable/>
    </div>
  );
};

export default MyPage;