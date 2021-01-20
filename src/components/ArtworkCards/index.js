import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useRecoilState, useRecoilValue } from "recoil"

import ArtworkCardImage from "./ArtworkCardImage"

import { shoppingBagState, artworksState } from "../../utils/atoms.js"
import { addToBag } from "../../utils/shoppingBag.js"

import styles from "./index.module.css"

export default function ArtworkCards({ tag }) {
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

  // make a copy of the artworks and filter them by tags
  let filteredArtworks = []
  if (tag) {
    filteredArtworks = artworks.filter(artwork => {
      if (artwork.tags) {
        return artwork.tags.includes(tag)
      } else {
        return false
      }
    })
  } else {
    filteredArtworks = artworks.filter(artwork => !artwork.tags)
  }

  // make a copy of the artworks and sort the copy descending by id and by unsold/sold
  const unsoldArtworks = filteredArtworks.filter(artwork => artwork.qty > 0)
  unsoldArtworks.sort((a, b) => (a.id < b.id ? 1 : -1))
  const soldArtworks = filteredArtworks.filter(artwork => artwork.qty === 0)
  soldArtworks.sort((a, b) => (a.id < b.id ? 1 : -1))
  const sortedArtworks = [...unsoldArtworks, ...soldArtworks]

  const [qtyOfArtToShow, setQtyOfArtToShow] = useState(9)

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
          onClick={() => setQtyOfArtToShow(qtyOfArtToShow + 9)}
          className={styles.showMoreButton}
        >
          Show more
        </button>
      ) : null}
    </div>
  )
}
