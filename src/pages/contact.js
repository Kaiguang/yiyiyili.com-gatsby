import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo.js"

export default function Contact() {
  return (
    <Layout>
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
        }}
      >
        <SEO title="Contact" />
        <h1>Contact me</h1>
        <span>Email:</span>
        <span>
          <a href="mailto:hello@yiyiyili.com">hello@yiyiyili.com</a>
        </span>
      </div>
    </Layout>
  )
}
