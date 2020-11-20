import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useRecoilState, useRecoilValue } from "recoil"

import { shoppingBagState, artworksState } from "../utils/atoms.js"
import { removeFromBag } from "../utils/shoppingBag.js"

import styles from "./ShoppingBagArtworkCards.module.css"

export default function ShoppingBagArtworkCards() {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { relativePath: { regex: "/^artwork-images/" } }) {
        edges {
          node {
            name
            childImageSharp {
              fixed(width: 60) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  let fixedImagesByName = {}
  data.allFile.edges.forEach(edge => {
    fixedImagesByName = {
      ...fixedImagesByName,
      [edge.node.name]: edge.node.childImageSharp.fixed,
    }
  })

  const [shoppingBag, setShoppingBag] = useRecoilState(shoppingBagState)
  const artworks = useRecoilValue(artworksState)
  const artworksInBag = () => {
    return artworks.filter(work => shoppingBag.includes(work.id))
  }

  return (
    <>
      {artworksInBag().map(artwork => (
        <div key={artwork.id} className={styles.artworkCard}>
          <Img fixed={fixedImagesByName[artwork.id]} alt={artwork.name} />
          <div className={styles.artworkCardInfo}>
            <span>{artwork.name}</span>
            <span className={styles.secondaryText}>{artwork.size}</span>
            <span className={styles.secondaryText}>
              {artwork.qty > 0 ? `$${artwork.price / 100}` : "Sold out"}
            </span>
            <button
              className={styles.removeButton}
              onClick={() =>
                removeFromBag(artwork.id, shoppingBag, setShoppingBag)
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
