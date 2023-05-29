import Image from 'next/image'
import Link from 'next/link';
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headtext}>
        <p>Welcome to volwise.com</p>
      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/vollogo.jpeg"
          alt="VolWise Logo"
          width={250}
          height={250}
          priority
        />
      </div>

      <div className={styles.grid}>
        <Link href="equities"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer">
          <h2>
            Equity ATM Vols <span>-&gt;</span>
          </h2>
          <p>This page shows vol spreads as well as historical percentiles of equity options</p>
        </Link>

        <Link href="spreads"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer">
              <h2>
                ATM Vol Spreads <span>-&gt;</span>
              </h2>
              <p>This is a screen for spreads, showing the volatilities of spreads of two different instruments.</p>
        </Link>
      </div>
    </main>
  )
}
