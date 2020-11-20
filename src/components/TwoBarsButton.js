import React, { useState } from "react"
import { Link } from "gatsby"

import styles from "./TwoBarsButton.module.css"

export default function TwoBarsButton() {
  const [isMenuModalShown, setIsMenuModalShown] = useState(false)
  const handleClick = () => {
    setIsMenuModalShown(!isMenuModalShown)
  }
  const dismissModal = () => {
    setIsMenuModalShown(false)
  }

  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        {isMenuModalShown ? (
          <span className={styles.closeIcon}>
            <span className={styles.stroke1}></span>
            <span className={styles.stroke2}></span>
          </span>
        ) : (
          <span className={styles.twoBars}></span>
        )}
      </button>
      <div
        className={`${styles.menu} ${
          isMenuModalShown ? null : styles.menuHidden
        }`}
        onClick={dismissModal}
        onKeyDown={null}
        role="button"
        tabIndex="0"
      >
        <Link to="/">Home</Link>
        <Link to="/shop/">Shop</Link>
        <Link to="/about/">About</Link>
        <Link to="/contact/">Contact</Link>
      </div>
    </>
  )
}
