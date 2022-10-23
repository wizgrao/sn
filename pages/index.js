import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {fromString, toString} from "../lib/utils.js";
import {useState} from "react";

export default function Home() {
  const [val, setVal] = useState("(1 2 3)(3 2)");
  return (
    <div className={styles.container}>
      <Head>
        <title>s_n calculator</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          s_n calculator
        </h1>
        <div>
            <textarea onChange={e => setVal(e.target.value)} value={val} /> < br />
          = {toString(fromString(val))}
        </div>
      </main>
      <i>thanks to fabrac 2022 squad</i>
    </div>
  )
}
