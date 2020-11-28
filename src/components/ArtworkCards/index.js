import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useRecoilState, useRecoilValue } from "recoil"

import ArtworkCardImage from "./ArtworkCardImage"

import { shoppingBagState, artworksState } from "../../utils/atoms.js"
import { addToBag } from "../../utils/shoppingBag.js"

import styles from "./index.module.css"

export default function ArtworkCards() {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { relativePath: { regex: "/^artwork-images/" } }) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  let fluidImagesByName = {}
  data.allFile.edges.forEach(edge => {
    fluidImagesByName = {
      ...fluidImagesByName,
      [edge.node.name]: edge.node.childImageSharp.fluid,
    }
  })

  const [shoppingBag, setShoppingBag] = useRecoilState(shoppingBagState)
  const artworks = useRecoilValue(artworksState)
  const unsoldArtworks = artworks.filter(artwork => artwork.qty > 0)
  unsoldArtworks.sort((a, b) => (a.id < b.id ? 1 : -1))
  const soldArtworks = artworks.filter(artwork => artwork.qty === 0)
  soldArtworks.sort((a, b) => (a.id < b.id ? 1 : -1))
  const sortedArtworks = [...unsoldArtworks, ...soldArtworks]

  const [qtyOfArtToShow, setQtyOfArtToShow] = useState(6)

  return (
    <div className={styles.container}>
      {sortedArtworks.slice(0, qtyOfArtToShow).map(artwork => {
        const fluidImages = artwork.imageNames.map(
          name => fluidImagesByName[name]
        )

        return (
          <div key={artwork.id} className={styles.card}>
            <ArtworkCardImage
              fluidImages={fluidImages}
              artworkName={artwork.name}
            />

            <div className={styles.name}>{artwork.name}</div>

            <div className={styles.cardSecondaryText}>{artwork.size}</div>

            {artwork.qty === 0 ? (
              <div className={styles.cardSecondaryText}>Sold</div>
            ) : (
              <>
                <div className={styles.cardSecondaryText}>
                  ${artwork.price / 100}
                </div>
                {shoppingBag.includes(artwork.id) ? (
                  <div className={styles.cardSecondaryText}>In your bag</div>
                ) : (
                  <button
                    className={styles.cardButton}
                    onClick={() =>
                      addToBag(artwork.id, shoppingBag, setShoppingBag)
                    }
                  >
                    Add to bag
                  </button>
                )}
              </>
            )}
          </div>
        )
      })}

      {qtyOfArtToShow < sortedArtworks.length ? (
        <button
          onClick={() => setQtyOfArtToShow(qtyOfArtToShow + 6)}
          className={styles.showMoreButton}
        >
          Show more
        </button>
      ) : null}
    </div>
  )
}
