import React from "react"
import { Link } from "gatsby"

import Logo from "../images/yiyiyi-logo.png"
import TwoBarsButton from "./TwoBarsButton"
import ShoppingBagLink from "./ShoppingBagLink"

import styles from "./Nav.module.css"

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <TwoBarsButton />
        <Link to="/">
          <img src={Logo} alt="Yi Li" />
        </Link>
        <ShoppingBagLink />
      </div>
    </nav>
  )
}
