import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import styles from "./about.module.css"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default function About() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "yi-portrait-art.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <div className={styles.container}>
        <SEO title="About" />

        <h1 className={styles.h1}>Yi Li</h1>
        <span className={styles.secondaryText}>
          putting colors together with threads and needles
        </span>

        <Img
          fluid={data.file.childImageSharp.fluid}
          alt="Portrait art of Yi"
          style={{ width: `100%` }}
        />

        <p>
          Hi, welcome to my <Link to="/shop/">shop</Link>.
        </p>

        <p>I'm Yi Li, lives in Edmonton, Alberta, Canada.</p>

        <p>
          I enjoy embroidery arts and that's my way of expressing my ideas. My
          inspirations are from every little things around me that complements
          my life. If I like something, I will stitch it onto a piece of cloth.
        </p>

        <p>
          Here you can see a <Link to="/shop/">collection</Link> of my arts,
          each piece is made by hand by me, so each piece is unique and there's
          only one of a kind. If you see something you like that was sold, feel
          free to let me know.
        </p>
      </div>
    </Layout>
  )
}
