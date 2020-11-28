import React from "react"

import styles from "./ImageSwitchButtons.module.css"

export default function ImageSwitchButtons({ qty, imageIndex, setImageIndex }) {
  let buttons = []
  for (let i = 0; i < qty; i++) {
    buttons.push(i)
  }

  const handleButtonClick = index => {
    setImageIndex(index)
  }

  return buttons.length > 1 ? (
    <div className={styles.container}>
      {buttons.map(index => (
        <button
          key={index}
          className={styles.button}
          onClick={() => handleButtonClick(index)}
        >
          <div className={imageIndex === index ? styles.selected : null}></div>
        </button>
      ))}
    </div>
  ) : null
}
