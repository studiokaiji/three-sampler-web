import Head from "next/head"
import React from "react"
import styles from "../styles/Home.module.scss"

export default function Home() {
  return (
    <div className={styles.container}>
      <p className="text-sm">こんにちは</p>
    </div>
  )
}
