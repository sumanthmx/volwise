import Link from 'next/link';
import styles from './navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.navtext}>
          <p>Volwise.com</p>
        </li>
        <li className={styles.navtext}>
          <Image src= "/vollogo.jpeg" alt = "logo" height = {50} width = {50}/>
        </li>
        <li className={styles.navtext}>
          <Link href="/">Equity ATM Vols</Link>
        </li>
        <li className={styles.navtext}>
          <Link href="/spreads">ATM Vol Spreads</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
