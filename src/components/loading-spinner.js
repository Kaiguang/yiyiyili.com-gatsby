import React from "react"
import PropTypes from "prop-types"
import styles from "./loading-spinner.module.css"

export default function LoadingSpinner({ size, className }) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={className}
    >
      <span className={styles.loadingSpinner}></span>
    </div>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.number.isRequired, // width and height in px
}
