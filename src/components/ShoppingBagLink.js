import React from "react"
import { Link } from "gatsby"
import { useRecoilValue } from "recoil"

import { shoppingBagState } from "../utils/atoms.js"

import styles from "./ShoppingBagLink.module.css"

export default function ShoppingBagLink() {
  const shoppingBag = useRecoilValue(shoppingBagState)

  return (
    <Link to="/shopping-bag/" className={styles.link}>
      <span className={styles.handle}></span>{" "}
      <span className={styles.bag}>
        {shoppingBag.length > 0 ? shoppingBag.length : null}
      </span>
    </Link>
  )
}
