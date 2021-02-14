import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import styles from "./index.module.css"

export default function IndexPage() {
  const colorPairs = [
    [`0C0C0C`, `0F971C`],
    [`6D90B9`, `BBC7DC`],
    [`6D90B9`, `BBC7DC`],
    [`A04970`, `3B7F99`],
    [`C9DEF4`, `B8A4C9`],
    [`D8BDBE`, `CC575F`],
    [`EBF4F5`, `B5C6E0`],
    // Pantone color of the year 2021
    [`F5DF4D`, `939597`],
  ]
  const [colorPair, setColorPair] = useState(colorPairs[0])
  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * colorPairs.length)
      setColorPair(colorPairs[index])
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [colorPairs])

  return (
    <Layout>
      <SEO />
      <div className={styles.container}>
        <div
          className={styles.colorSquare}
          style={{
            backgroundImage: `linear-gradient(90deg, #${colorPair[0]}, #${colorPair[1]})`,
          }}
        ></div>
        <p className={styles.headline}>
          putting colors together with threads and needles
        </p>
        <Link to="/about/" className={styles.link}>
          more...
        </Link>

        <Link to="/collections/" className={styles.link}>
          Collections
        </Link>
      </div>
    </Layout>
  )
}
