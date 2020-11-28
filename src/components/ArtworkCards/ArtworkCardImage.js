import React, { useState } from "react"
import Img from "gatsby-image"

import ImageSwitchButtons from "./ImageSwitchButtons"

export default function ArtworkCardImage({ fluidImages, artworkName }) {
  const [imageIndex, setImageIndex] = useState(0)

  const getFluid = index => fluidImages[index]

  return (
    <>
      <Img
        fluid={getFluid(imageIndex)}
        alt={artworkName}
        imgStyle={{
          borderTopLeftRadius: `20px`,
          borderTopRightRadius: `20px`,
        }}
      />

      <ImageSwitchButtons
        qty={fluidImages.length}
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
      />
    </>
  )
}
