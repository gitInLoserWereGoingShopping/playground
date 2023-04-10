import styles from './page.module.css'
import NavBar from './navbar'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <NavBar />
      </div>
    </main>
  )
}
