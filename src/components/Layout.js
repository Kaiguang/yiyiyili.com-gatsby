import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Nav from "./Nav"

import styles from "./Layout.module.css"

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    {
      emailIcon: file(relativePath: { eq: "emailIcon.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      instagramIcon: file(relativePath: { eq: "instagram.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      xiaohongshuIcon: file(relativePath: { eq: "xiaohongshu.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <div className={`${styles.container}`}>
      <Nav />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span>Yi Li © 2020</span>
        <div className={styles.socialMediaLinkContainer}>
          <a
            href="mailto:hello@yiyiyili.com"
            className={styles.socialMediaLink}
          >
            <Img
              fixed={data.emailIcon.childImageSharp.fixed}
              alt="Send me an email"
            />
            <span>hello@yiyiyili.com</span>
          </a>
          <a
            href="https://www.instagram.com/yiyiyi_li_embroidery/"
            className={styles.socialMediaLink}
          >
            <Img
              fixed={data.instagramIcon.childImageSharp.fixed}
              alt="Link to my Instagram account"
            />
            <span>yiyiyi_li_embroidery</span>
          </a>
          <a
            href="https://www.xiaohongshu.com/user/profile/5aea94a0e8ac2b6d4c5f92aa"
            className={styles.socialMediaLink}
          >
            <Img
              fixed={data.xiaohongshuIcon.childImageSharp.fixed}
              alt="Link to my Xiaohongshu account"
            />
            <span>112225707</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
